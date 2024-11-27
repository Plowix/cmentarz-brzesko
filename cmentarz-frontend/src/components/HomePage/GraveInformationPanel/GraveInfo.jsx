import { useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCross, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import ModalImage from '../../Decor/ModalImage'
import Spinner from "../../Decor/Spinner";
import PersonInfo from "./PersonInfo";

import './GraveInformationPanel.css';

function GraveInfo({selectedGraveId, setModalImage, setZoomFlag}){
    const [graveData, setGraveData] = useState({});
    const [isLoading, setIsLoading] = useState(true)

    const apiUrl = process.env.REACT_APP_API_URL
    
    useEffect(() => {
        setIsLoading(true);
        fetch(apiUrl+'/?grave_id='+encodeURIComponent(selectedGraveId))
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Błąd podczas pobierania danych");
                }
                return response.json();
            })
            .then((data) => setGraveData(data))
            .then(() => setIsLoading(false))
            .catch((error) => console.error("Błąd:", error));
    }, [selectedGraveId]);

    return(
        <div className="grave-information-panel expanded">
            {isLoading ? <Spinner/> : <>
            <div className="top-part">
            <ModalImage
                imageUrl={process.env.REACT_APP_URL+"/images/graves/"+(graveData.id.replace("/", "_"))+".jpg"}
                setModalImage={setModalImage}
                altText={"Zdjęcie grobu"}
                />
            <div className="additional-grave-info">
                <div className="location-box">
                    <p className="sector-box">Sektor {graveData.id.split("/")[0]}</p>
                    <p className="grave-number-box">Numer {parseInt(graveData.id.split("/")[1])}</p>
                </div>
                <button 
                    className="btn btn-outline-secondary show-location-button"
                    onClick={(e)=>setZoomFlag(true)}    
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    &nbsp;
                    Pokaż na mapie
                </button>
            </div>
            </div>
            <div className="bottom-info-container">
            <h2 className="grave-people-header"><FontAwesomeIcon icon={faCross}/> Pochowani:</h2>
            <div className="people-container">
                {graveData['people'] ? 
                graveData['people'].map(function(data){return(<PersonInfo key={data.full_name} personData={data}/>)}) :
                ""}
            </div>
            </div>
            </>
            }
        </div>
    )
}

export default GraveInfo;