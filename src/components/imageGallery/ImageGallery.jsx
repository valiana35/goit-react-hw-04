import ImageCard from "../imageCard/ImageCard";
import css from "./ImageGallery.module.css"

const ImageGallery = ({ photos, openModal }) => {
    return (
          <ul className={css.card}><li>{photos.map(({ id, description, urls }) => {
              <ImageCard id={id} alt={description} src={urls.small} openModal={openModal}/>
          })}</li></ul>)
}

export default ImageGallery;