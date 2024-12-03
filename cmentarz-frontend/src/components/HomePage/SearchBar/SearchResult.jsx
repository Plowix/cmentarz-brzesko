import { useState } from "react";
import { formatDate } from "../../../utils/DateUtils";
import Spinner from "../../Decor/Spinner";

function SearchResult({ personData, handleResultClick }) {
    const [isLoading, setIsLoading] = useState(true); 
    const [isError, setIsError] = useState(false);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    const handleImageError = () => {
        setIsLoading(false); 
    };

    const imageUrl = `${process.env.REACT_APP_URL}/images/graves/${personData.grave_id.replace("/", "_")}.jpg`;

    return (
        <div
            className="search-result"
            onMouseDown={(e) => {
                e.preventDefault();
                handleResultClick(personData.grave_id);
            }}
        >
            <div className="image-wrapper">
                {isLoading && (
                    <div className="spinner-overlay">
                        <Spinner />
                    </div>
                )}
                <img
                    src={imageUrl}
                    alt=""
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />
            </div>
            <h5 className="search-result-name">śp. {personData.full_name}</h5>
            <i>
                <b>ur.</b> {formatDate(personData.birth_date)}
            </i>
            <i>
                <b>zm.</b> {formatDate(personData.death_date)}
            </i>
        </div>
    );
}

export default SearchResult;
