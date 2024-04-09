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
  const [isEmpty, setIsEmpty] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [urls, setUrls] = useState("");
  const [alt, setAlt] = useState("");

  useEffect(() => {
    if (!query) return;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getImages(page, query);
        setImages((prevImages) => [...prevImages, ...data.results]);
        setIsVisible(page < data.total_pages);
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

  const openModal = (urls, alt) => {
    setShowModal(true);
    setUrls(urls.regular);
    setAlt(alt.description);
  }
  
  const closeModal = () => {
    setShowModal(false);
    setUrls("");
    setAlt("");
  }

  return (
    <>
    <SearchBar onSubmit={onHandleSubmit}/>
    {images.length > 0 && (<ImageGallery images={images} openModal={openModal} />)}
    {isVisible && !isLoading && (<LoadMoreBtn onClick={onLoadMore} disabled={isLoading} />)}
    {isLoading && <Loader />}
    {error && <ErrorMessage />}
    {!images.length && !isEmpty && (<p>Sorry, there is no images...</p>)}
    <ImageModal url={urls} alt={alt} modalIsOpen={showModal} closeModal={closeModal} />
    </>
  );
}

export default App
