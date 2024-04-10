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
        const { results, per_page, total_pages } = await getImages(query, page);
        if (!results.length) {
          setIsEmpty(true);
          return;
        }
        setImages((prevImages) => [...prevImages, ...results]);
        setIsVisible(page < Math.ceil(total_pages / per_page));
      } catch (error) {
        setError(error); 
      } finally {
        setIsLoading(false);
      }
    };
    fetchData()
  }, [query, page]);

  const onHandleSubmit = (value) => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setIsEmpty(false);
    setError(false);
    setIsVisible(false);
  }

  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  const openModal = (url, alt) => {
    setShowModal(true);
    setUrl(url.urls.regular);
    setAlt(alt.alt_description);
  }
  
  const closeModal = () => {
    setShowModal(false);
    setUrl("");
    setAlt("");
  }

  return (
    <>
    <SearchBar onSubmit={onHandleSubmit} />
    {images.length > 0 && (<ImageGallery images={images} openModal={openModal} />)}
    {isVisible && !isLoading && (
      <LoadMoreBtn onClick={onLoadMore} disabled={isLoading}>
      {isLoading ? "Loading" : "Load more"}
      </LoadMoreBtn>
    )}
    {isLoading && <Loader />}
    {!images.length && isEmpty && (<p>Sorry, there is no images...</p>)}
    {error && <ErrorMessage />}
    <ImageModal url={url} alt={alt} modalIsOpen={showModal} closeModal={closeModal} />
    </>
  );
}

export default App
