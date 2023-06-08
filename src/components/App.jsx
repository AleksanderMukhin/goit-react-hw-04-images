import { Component } from 'react';
import css from './App.module.css';
import { RequestServer } from '../pixabayAPI';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { BtnLoadMore } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

const requestServer = new RequestServer();
export class App extends Component {
  state = {
    imgs: [],
    totalHits: 0,
    page: 1,
    value: '',
    stateLoader: false,
    stateModal: false,
    modalImg: '',
    error: null,
  };

  resetState = () => {
    this.setState({ imgs: [], totalHits: 0, page: 1, value: '', error: null });
  };

  getImages = async (value = this.state.value) => {
    this.setState({ stateLoader: true });

    try {
      const {
        data: { hits, totalHits },
      } = await requestServer.searchImg(value, this.state.page);
      if (totalHits === 0) {
        this.setState({ error: 'No images found!' });
      }
      this.setState(prevState => {
        return {
          imgs: [...prevState.imgs, ...hits],
          totalHits,
          page: this.state.page + 1,
          value,
        };
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ stateLoader: false });
    }
  };

  openModal = ({ currentTarget: { id } }) => {
    const imgModal = this.state.imgs.find(hit => hit.id === Number(id));
    this.setState({ modalImg: imgModal, stateModal: true });
  };

  closeModal = () => {
    this.setState({ stateModal: false });
  };

  render() {
    const { imgs, stateLoader, totalHits, page, stateModal, modalImg, error } =
      this.state;
    const { resetState, getImages, openModal, closeModal } = this;

    return (
      <div className={css.app}>
        <Searchbar resetState={resetState} getImages={getImages}></Searchbar>

        {error ? (
          <h2>{error}</h2>
        ) : (
          <ImageGallery imgs={imgs} openModal={openModal} />
        )}

        {stateLoader && <Loader />}

        {totalHits / 12 > page - 1 && <BtnLoadMore getImages={getImages} />}

        {stateModal && <Modal modalImg={modalImg} closeModal={closeModal} />}
      </div>
    );
  }
}
