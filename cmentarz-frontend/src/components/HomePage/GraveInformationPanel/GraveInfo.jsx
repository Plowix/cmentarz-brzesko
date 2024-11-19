import { useState, useEffect } from "react";

import PersonInfo from "./PersonInfo";
function GraveInfo(props){
    const [graveData, setGraveData] = useState({});

    const apiUrl = process.env.REACT_APP_API_URL
    
    useEffect(() => {
        fetch(apiUrl+"/?grave_id="+props.graveId)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Błąd podczas pobierania danych");
                }
                return response.json();
            })
            .then((data) => setGraveData(data))
            .catch((error) => console.error("Błąd:", error));
    }, []);

    return(
        <div className="grave-information-panel">
            <img src={process.env.REACT_APP_URL+graveData.photo_path} alt="Zdjęcie grobu"/>
            <hr />
            <h2>Pochowani:</h2>
            <hr />
            <div className="people-container">
                {graveData['people'] ? 
                graveData['people'].map(function(data){return(<PersonInfo key={data.full_name} personData={data}/>)}) :
                ""}
            </div>
        </div>
    )
}

export default GraveInfo;