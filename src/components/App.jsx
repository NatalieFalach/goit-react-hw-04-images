import { Searchbar } from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "components/Loader/Loader";
import { Modal } from "components/Modal/Modal";
import Button from "components/Button/Button";
import { pixaBayApi, PIXABEY_PER_PAGE } from "api/pixabayApi";
import styles from './App.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from "react";


export function App() {
  const [search, setSearch] = useState('');
  const [imagesList, setImagesList] = useState([]);
  const [isShowLoadMore, setIsShowLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState(null);
  const [page, setPage] = useState(1);
  const [tags, setTags] = useState('');


  useEffect(() => {
    if (!search) {
      return;
    }

    setLoading(true)
     
    pixaBayApi(search, page).then(({ hits, total }) => {
      if (hits.length === 0 && search) {
        toast.error('Nothing found')
      }
      if (page * PIXABEY_PER_PAGE < total) {
        setIsShowLoadMore(true);
      } else {
        setIsShowLoadMore(false);
      }

      setLoading(false);
      setImagesList(imagesList => ([...imagesList, ...hits]));
  }).catch(error => {
    toast.error('Network error') 
    setLoading(false);
  });      
  }, [page, search]);
  

  const toggleModal = (largeImageUrl = null, tags = '') => {
    setIsShowModal(( isShowModal ) => (!isShowModal ));
    setLargeImageUrl(largeImageUrl );
    setTags(tags)
  }

  const onLoadMore = (e) => {
    setPage((page) => page + 1)
  }

  const handleFormSubmit = query => {
    if (search === query) {
      return;
    }
    setSearch(query);
    setPage(1);
    setImagesList([]);
  }

  return (
    <div className={styles.App}>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery imagesList={imagesList} onShowModal={toggleModal} />

        {loading && <Loader />}

        {!loading && isShowLoadMore && <Button onLoadMore={onLoadMore} />}
        
        {isShowModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImageUrl} alt={tags}/>
          </Modal>
        )}  
        <Toaster position="top-right" />
      </div>
  )
}




