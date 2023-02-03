import Button from 'components/Button';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import Message from 'components/Message';
import { Component } from 'react';
import { getSarchedImages } from 'service/pixabayAPI';
import css from './ImageGallery.module.css';
import { ImageGalleryPropTypes } from './ImageGallery.types';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImageGallery extends Component {
  state = {
    list: [],
    isShowLoadMoreButton: false,
    status: Status.IDLE,
    error: null,
  };
  page = 1;

  componentDidUpdate(prevProps) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.fetchSearch(1);
    }
  }

  async fetchSearch(page) {
    try {
      this.setState({
        status: Status.PENDING,
        error: null,
        isShowLoadMoreButton: false,
        list: page === 1 ? [] : this.state.list,
      });
      this.page = page;
      const data = await getSarchedImages(this.props.searchQuery, page);

      this.setState(prevState => ({
        status: Status.RESOLVED,
        isShowLoadMoreButton: page * data.per_page < data.totalHits,
        list: [...prevState.list, ...data.hits],
      }));
    } catch (err) {
      this.setState({ status: Status.REJECTED, error: err.message });
    }
  }

  render() {
    const { status, error, list, isShowLoadMoreButton } = this.state;

    if (status === Status.IDLE) {
      return <Message title="Please enter search parameters" />;
    }

    if (status === Status.REJECTED) {
      return <Message title={error} />;
    }

    return (
      <>
        {list.length === 0 && status !== Status.PENDING ? (
          <Message
            title={`Nothing was found for "${this.props.searchQuery}".`}
          />
        ) : (
          <ul className={css.imageGallery}>
            {list.map(item => (
              <ImageGalleryItem key={item.id} item={item} />
            ))}
          </ul>
        )}

        {status === Status.PENDING && <Loader />}

        {isShowLoadMoreButton && (
          <Button
            onClick={() => {
              this.fetchSearch(this.page + 1);
            }}
          >
            Load more
          </Button>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = ImageGalleryPropTypes;