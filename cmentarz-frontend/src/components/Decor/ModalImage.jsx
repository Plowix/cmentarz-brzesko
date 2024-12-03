import { useState } from "react";

function ModalImage({ imageUrl, setModalImage, altText }) {
    const [imageError, setImageError] = useState(false); 

    return (
        <img
            className={`modal-image ${imageError ? "src-not-found" : ""}`} 
            src={imageUrl}
            alt={altText || "Image"}
            onClick={imageError ? null : () => setModalImage(imageUrl)} 
            onError={() => setImageError(true)}
        />
    );
}

export default ModalImage;
