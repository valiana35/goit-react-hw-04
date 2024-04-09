import ImageCard from "../imageCard/ImageCard";
import css from "./ImageGallery.module.css"

const ImageGallery = ({ images, openModal }) => {
    return (
          <ul className={css.card}>
            {images.map((image) => {
              return (
                <li key={image.id}>
                   <ImageCard image={image} openModal={openModal}/>
                </li>
              );
          })}
        </ul>
    );
}

export default ImageGallery;