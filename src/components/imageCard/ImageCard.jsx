// import css from './ImageCard.module.css'

const ImageCard = ({ id, description, urls, openModal, }) => {
    return (
        <div>
            <img src={urls.small} alt={description} id={id} onClick={() => openModal(urls.regular, description)} />
        </div>
    ); 
}

export default ImageCard;