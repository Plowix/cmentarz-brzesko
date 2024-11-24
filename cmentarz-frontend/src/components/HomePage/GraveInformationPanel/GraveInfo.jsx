import { useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCross } from '@fortawesome/free-solid-svg-icons';

import ModalImage from '../../Decor/ModalImage'
import Spinner from "../../Decor/Spinner";
import PersonInfo from "./PersonInfo";

import './GraveInformationPanel.css';

function GraveInfo({selectedGraveId, setModalImage}){
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
        <div className="grave-information-panel">
            {isLoading ? <Spinner/> : <>
            <ModalImage
                imageUrl={process.env.REACT_APP_URL+graveData.photo_path}
                setModalImage={setModalImage}
                altText={"Zdjęcie grobu"}
                />
            <div className="info-container">
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