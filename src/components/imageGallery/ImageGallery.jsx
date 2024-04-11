import ImageCard from "../imageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ images, openModal }) => {
    return (
          <ul className={css.card}>
            {images.map((image) => {
              return (
                <li key={image.id} className={css.cardItem}>
                   <ImageCard image={image} openModal={openModal} />
                </li>
              );
          })}
        </ul>
    );
}

export default ImageGallery;