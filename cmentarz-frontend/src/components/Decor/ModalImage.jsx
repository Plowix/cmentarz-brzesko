import { useState } from "react";
import Spinner from "./Spinner";

function ModalImage({ imageUrl, setModalImage, altText }) {
    const [isLoading, setIsLoading] = useState(true); 
    const [isError, setIsError] = useState(false);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    const handleImageError = () => {
        setIsLoading(false); 
        setIsError(true);
    };

    return (
        <div className="modal-image-wrapper">
        {
        isLoading && <div className="spinner-overlay">
            <Spinner />
        </div>
        }
        <img
            className={`modal-image ${isError ? "src-not-found" : ""}`} 
            src={imageUrl}
            alt={altText || "Image"}
            onClick={isError ? null : () => setModalImage(imageUrl)} 
            onLoad={handleImageLoad}
            onError={handleImageError}
        />
        </div>
    );
}

export default ModalImage;
