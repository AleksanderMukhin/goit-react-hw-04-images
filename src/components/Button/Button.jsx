import PropTypes from 'prop-types';
import css from './Buton.module.css';

export const BtnLoadMore = ({ loadMoreBtn }) => {
  return (
    <>
      <button className={css.button} onClick={() => loadMoreBtn()}>
        Load more
      </button>
    </>
  );
};

BtnLoadMore.propTypes = {
  loadMoreBtn: PropTypes.func.isRequired,
};
