import { useState } from 'react';
import css from './App.module.css';
import { searchImg } from '../pixabayAPI';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { BtnLoadMore } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { useEffect } from 'react';

export const App = () => {
  const [imgs, setImgs] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState('');
  const [stateLoader, setStateLoader] = useState(false);
  const [stateModal, setStateModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [error, setError] = useState('');

  const resetState = () => {
    setImgs([]);
    setTotalHits(0);
    setPage(1);
    setValue('');
    setError(null);
  };

  useEffect(() => {
    setStateLoader(true);
    console.log(value);
    searchImg(value, page)
      .then(images => {
        if (images.totalHits === 0) {
          setError('No images found!');
        }
        setImgs(prevState => [...prevState, ...images.hits]);
        console.log(images.totalHits);
        setTotalHits(images.totalHits);
        setStateLoader(false);
      })
      .catch(error => {
        setError(error.message);
      });
  }, [value, page, totalHits]);

  const openModal = ({ currentTarget: { id } }) => {
    const imgModal = imgs.find(hit => hit.id === Number(id));
    setModalImg(imgModal);
    setStateModal(true);
  };

  const closeModal = () => {
    setStateModal(false);
  };

  const changeValue = inputValue => {
    console.log(inputValue);
    setValue(inputValue);
    setPage(1);
  };

  const loadMoreBtn = () => {
    setPage(page + 1);
  };

  return (
    <div className={css.app}>
      <Searchbar changeValue={changeValue} resetState={resetState}></Searchbar>

      {error ? (
        <h2>{error}</h2>
      ) : (
        <ImageGallery imgs={imgs} openModal={openModal} />
      )}

      {stateLoader && <Loader />}

      {totalHits / 12 > page - 1 && <BtnLoadMore loadMoreBtn={loadMoreBtn} />}

      {stateModal && <Modal modalImg={modalImg} closeModal={closeModal} />}
    </div>
  );
};

// ======================
// export class App extends Component {
//   state = {
//     imgs: [],
//     totalHits: 0,
//     page: 1,
//     value: '',
//     stateLoader: false,
//     stateModal: false,
//     modalImg: '',
//     error: null,
//   };

//   resetState = () => {
//     this.setState({ imgs: [], totalHits: 0, page: 1, value: '', error: null });
//   };

//   getImages = async (value = this.state.value) => {
//     this.setState({ stateLoader: true });

//     try {
//       const {
//         data: { hits, totalHits },
//       } = await requestServer.searchImg(value, this.state.page);
//       if (totalHits === 0) {
//         this.setState({ error: 'No images found!' });
//       }
//       this.setState(prevState => {
//         return {
//           imgs: [...prevState.imgs, ...hits],
//           totalHits,
//           page: this.state.page + 1,
//           value,
//         };
//       });
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ stateLoader: false });
//     }
//   };

//   openModal = ({ currentTarget: { id } }) => {
//     const imgModal = this.state.imgs.find(hit => hit.id === Number(id));
//     this.setState({ modalImg: imgModal, stateModal: true });
//   };

//   closeModal = () => {
//     this.setState({ stateModal: false });
//   };

//   render() {
//     const { imgs, stateLoader, totalHits, page, stateModal, modalImg, error } =
//       this.state;
//     const { resetState, getImages, openModal, closeModal } = this;

//     return (
//       <div className={css.app}>
//         <Searchbar resetState={resetState} getImages={getImages}></Searchbar>

//         {error ? (
//           <h2>{error}</h2>
//         ) : (
//           <ImageGallery imgs={imgs} openModal={openModal} />
//         )}

//         {stateLoader && <Loader />}

//         {totalHits / 12 > page - 1 && <BtnLoadMore getImages={getImages} />}

//         {stateModal && <Modal modalImg={modalImg} closeModal={closeModal} />}
//       </div>
//     );
//   }
// }
