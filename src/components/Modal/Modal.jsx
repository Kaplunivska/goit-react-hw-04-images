import Loader from 'components/Loader';
import Message from 'components/Message';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import { ModalPropTypes } from './Modal.types';

const modalRoot = document.querySelector('#modal-root');
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class Modal extends Component {
  state = {
    status: Status.IDLE,
    error: null,
  };

  componentDidMount() {
    this.addListeners();
    this.setState({ status: Status.PENDING });
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners = () => {
    window.addEventListener('keydown', this.keyDownHandler);
  };

  removeListeners = () => {
    window.removeEventListener('keydown', this.keyDownHandler);
  };

  keyDownHandler = evt => {
    if (evt.key !== 'Escape') return;

    this.close();
  };

  clickBackdropHandler = evt => {
    if (evt.target !== evt.currentTarget) return;
    this.close();
  };

  loadSuccessHandler = () => {
    this.setState({ status: Status.RESOLVED });
  };
  loadeFailedHandler = () => {
    this.setState({ status: Status.REJECTED, error: 'Image not loaded.' });
  };

  close = () => {
    this.props.onClose();
  };

  render() {
    const { url, alt } = this.props;
    const { status, error } = this.state;

    return createPortal(
      <div className={css.overlay} onClick={this.clickBackdropHandler}>
        <div className={css.modal}>
          {status === Status.PENDING && <Loader />}
          {status === Status.REJECTED && (
            <Message title={error} color="white" />
          )}
          <img
            src={url}
            alt={alt}
            onLoad={this.loadSuccessHandler}
            onError={this.loadeFailedHandler}
          />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = ModalPropTypes;