import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ url, id, tags, openModal }) => {
  return (
    <>
      <li className={css.imageGalleryItem} id={id} onClick={openModal}>
        <img className={css.imageGalleryItem_image} src={url} alt={tags} />
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
