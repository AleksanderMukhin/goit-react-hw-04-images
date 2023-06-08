import PropTypes from 'prop-types';
import css from './Buton.module.css';

export const BtnLoadMore = ({ getImages }) => {
  return (
    <>
      <button className={css.button} onClick={() => getImages()}>
        Load more
      </button>
    </>
  );
};

BtnLoadMore.propTypes = {
  getImages: PropTypes.func.isRequired,
};
