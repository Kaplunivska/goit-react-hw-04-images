import Button from 'components/Button';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import Message from 'components/Message';
import { useImageSearch } from 'hooks/useImageSearch';
import css from './ImageGallery.module.css';
import { ImageGalleryPropTypes } from './ImageGallery.types';

export default function ImageGallery({ searchQuery }) {
  const {
    isFetching,
    isError,
    fetchStatus,
    data: list,
    error,
    hasNextPage,
    fetchNextPage,
  } = useImageSearch(searchQuery);

  if (isError) {
    return <Message title={error.message} />;
  }

  if (!list && fetchStatus === 'idle') {
    return <Message title="Please enter search parameters" />;
  }

  return (
    <>
      {list?.length === 0 && !isFetching ? (
        <Message title={`Nothing was found for "${searchQuery}".`} />
      ) : (
        <ul className={css.imageGallery}>
          {list?.map(item => (
            <ImageGalleryItem key={item.id} item={item} />
          ))}
        </ul>
      )}

      {isFetching && <Loader />}
      {!isFetching && hasNextPage && (
        <Button onClick={fetchNextPage}>Load more</Button>
      )}
    </>
  );
}

ImageGallery.propTypes = ImageGalleryPropTypes;