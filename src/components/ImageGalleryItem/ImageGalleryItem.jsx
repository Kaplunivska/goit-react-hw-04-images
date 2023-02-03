import css from './ImageGalleryItem.module.css';
import { ImageGalleryItemPropTypes } from './ImageGalleryItem.types';
import { Component } from 'react';
import Modal from 'components/Modal';

export default class ImageGalleryItem extends Component {
  state = {
    isShowModal: false,
  };

  clickHandler = evt => {
    evt.preventDefault();
    this.setState({ isShowModal: true });
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props.item;
    const { isShowModal } = this.state;

    return (
      <>
        <li className={css.imageGalleryItem}>
          <a href={largeImageURL} onClick={this.clickHandler}>
            <img
              className={css.imageGalleryItemImage}
              src={webformatURL}
              alt={tags}
            />
          </a>
        </li>

        {isShowModal && (
          <Modal
            url={largeImageURL}
            alt={tags}
            onClose={() => this.setState({ isShowModal: false })}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = ImageGalleryItemPropTypes;