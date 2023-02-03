import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Loader from 'components/Loader';
import Message from 'components/Message';
import css from './Modal.module.css';
import { ModalPropTypes } from './Modal.types';

const modalRoot = document.querySelector('#modal-root');
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function Modal({ url, alt, onClose }) {
 const [status, setStatus] = useState(Status.PENDING);
 const [error, setError] = useState(null);
 const close = useCallback(() => {
   onClose();
  }, [onClose]);

  useEffect(() => {
  
    const keyDownHandler = evt => {
     if (evt.key === 'Escape') close();
    };

   window.addEventListener('keydown', keyDownHandler);

   return () => {
     window.removeEventListener('keydown', keyDownHandler);
   };
  }, [close]);


  const clickBackdropHandler = evt => {
    if (evt.target !== evt.currentTarget) return;
    close();
  };

  const loadSuccessHandler = () => {
    setStatus(Status.RESOLVED);
  };

  const loadeFailedHandler = () => {
    setStatus(Status.REJECTED);
    setError('Image not loaded.');
  };

    return createPortal(
      <div className={css.overlay} onClick={clickBackdropHandler}>
        <div className={css.modal}>
          {status === Status.PENDING && <Loader />}
          {status === Status.REJECTED && <Message title={error} color="white" />}
          <img
            src={url}
            alt={alt}
            onLoad={loadSuccessHandler}
            onError={loadeFailedHandler}
          />
        </div>
      </div>,
      modalRoot
    );
  }

Modal.propTypes = ModalPropTypes;