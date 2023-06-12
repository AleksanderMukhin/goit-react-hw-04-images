import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ modalImg, closeModal }) => {
  useEffect(() => {
    const onClickOverlay = ({ target: { id } }) => {
      if (id === 'overlay') {
        closeModal();
      }
    };
    const checkKeyEsc = ({ code }) => {
      if (code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', checkKeyEsc);
    window.addEventListener('click', onClickOverlay);
    return () => {
      window.removeEventListener('keydown', checkKeyEsc);
      window.removeEventListener('click', onClickOverlay);
    };
  }, [closeModal]);
  // componentDidMount() {
  //   window.addEventListener('keydown', checkKeyEsc);
  //   window.addEventListener('click', onClickOverlay);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', checkKeyEsc);
  //   window.removeEventListener('click', onClickOverlay);
  // }

  // const checkKeyEsc = ({ code }) => {
  //   if (code === 'Escape') {
  //     closeModal();
  //   }
  // };

  // const onClickOverlay = ({ target: { id } }) => {
  //   if (id === 'overlay') {
  //     closeModal();
  //   }
  // };

  const { tags, largeImageURL } = modalImg;

  return (
    <div className={css.overlay} id="overlay">
      <div className={css.modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  modalImg: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};
