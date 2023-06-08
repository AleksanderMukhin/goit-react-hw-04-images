import { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export class Modal extends Component {
  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.checkKeyEsc);
    window.addEventListener('click', this.onClickOverlay);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.checkKeyEsc);
    window.removeEventListener('click', this.onClickOverlay);
  }

  checkKeyEsc = ({ code }) => {
    if (code === 'Escape') {
      this.props.closeModal();
    }
  };

  onClickOverlay = ({ target: { id } }) => {
    if (id === 'overlay') {
      this.props.closeModal();
    }
  };

  render() {
    const { tags, largeImageURL } = this.props.modalImg;
    return (
      <div className={css.overlay} id="overlay">
        <div className={css.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  modalImg: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};
