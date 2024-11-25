function ModalImage({imageUrl, setModalImage, altText}){
    return(
        <img 
            className="modal-image" 
            src={imageUrl} 
            alt={altText}
            onClick={(e) => setModalImage(imageUrl)}/>
    )
}

export default ModalImage;