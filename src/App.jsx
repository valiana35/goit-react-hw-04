import { useState, useEffect } from 'react'
import SearchBar from './components/searchBar/SearchBar'
import { getImages } from '../src/apiService/getImages'
import Loader from './components/loader/Loader'
import ErrorMessage from './components/errorMessage/ErrorMessage'
import ImageGallery from './components/imageGallery/ImageGallery'
import LoadMoreBtn from './components/loadMoreBtn/LoadMoreBtn'
import ImageModal from './components/imageModal/ImageModal'
import './App.css'

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");

  useEffect(() => {
    if (!query) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { photos, per_page, total_results } = await getImages(query, page);
        if (!photos.length) {
          setIsEmpty(true);
          return;
        }
        setImages(prevImages => ([...prevImages, ...photos]));
        setIsVisible(page < Math.ceil(total_results / per_page));
      } catch (error) {
        setError(error); 
      } finally {
        setIsLoading(false);
      }
    };
    fetchData()
  }, [page, query]);

  const onHandleSubmit = (value) => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setIsEmpty(false);
    setError(false);
    setIsVisible(false);
  }

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1)
}

  const openModal = (url, alt) => {
    setShowModal(true);
    setUrl(url);
    setAlt(alt);
  }
  
  const closeModal = () => {
    setShowModal(false);
    setUrl("");
    setAlt("");
  }

  return (
    <>
    <SearchBar onSubmit={onHandleSubmit}/>
    {images.length > 0 && <ImageGallery images={images} openModal={openModal}/>}
    {isVisible && <LoadMoreBtn onClick={onLoadMore} disabled={isLoading}>{isLoading ? "Loading" : "Load more"}</LoadMoreBtn>}
    {isLoading && <Loader />}
    {error && <ErrorMessage />}
    {isEmpty && (<p>Sorry, there is no images...</p>)}
    <ImageModal url={url} alt={alt} modalIsOpen={showModal} closeModal={closeModal} />
    </>
  )
}

export default App
