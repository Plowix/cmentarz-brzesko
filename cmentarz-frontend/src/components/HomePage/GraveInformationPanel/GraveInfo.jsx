import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCross } from '@fortawesome/free-solid-svg-icons';

import PersonInfo from "./PersonInfo";
function GraveInfo({selectedGraveId}){
    const [graveData, setGraveData] = useState({});

    const apiUrl = process.env.REACT_APP_API_URL
    
    useEffect(() => {
        fetch(apiUrl+'/?grave_id='+encodeURIComponent(selectedGraveId))
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Błąd podczas pobierania danych");
                }
                return response.json();
            })
            .then((data) => setGraveData(data))
            .catch((error) => console.error("Błąd:", error));
    }, [selectedGraveId]);

    return(
        <div className="grave-information-panel">
            <img src={process.env.REACT_APP_URL+graveData.photo_path} alt="Zdjęcie grobu"/>
            <h2 className="grave-people-header"><FontAwesomeIcon icon={faCross}/> Pochowani:</h2>
            <div className="people-container">
                {graveData['people'] ? 
                graveData['people'].map(function(data){return(<PersonInfo key={data.full_name} personData={data}/>)}) :
                ""}
            </div>
        </div>
    )
}

export default GraveInfo;