import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ imgs, openModal }) => {
  return (
    <>
      <ul className={css.imageGallery}>
        {imgs.map(el => {
          return (
            <ImageGalleryItem
              key={el.id}
              id={el.id}
              url={el.webformatURL}
              tags={el.tags}
              openModal={openModal}
            />
          );
        })}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  imgs: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};
