import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const ImageModal = ({ url, alt, modalIsOpen, closeModal }) => {
    return  (
      <div>
       <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
       >
          <img src={url} alt={alt} />
       </Modal>
      </div>
    );
}

export default ImageModal;