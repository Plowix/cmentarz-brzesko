import { useState, useEffect } from 'react';

import MapSearchBar from "./SearchBar/MapSearchBar";
import Map from "./Map";

function HomePage(){
    const [graves, setGraves] = useState([]);
    const [selectedGraveID, setSelectedGraveID] = useState("0");
    const [zoomFlag, setZoomFlag] = useState(false); //jeżeli true to mapa zoomuje do wybranego grobu

    const apiUrl = process.env.REACT_APP_API_URL
    
    useEffect(() => {
        fetch(apiUrl+"/?grave_coords")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Błąd podczas pobierania danych");
                }
                return response.json();
            })
            .then((data) => setGraves(data))
            .catch((error) => console.error("Błąd:", error));
    }, []);

    function handleSelectGrave(newSelectedID){
        setSelectedGraveID(newSelectedID);
        setZoomFlag(true);
    }

    return(
        <main>
            <MapSearchBar handleSelectGrave={handleSelectGrave} />
            <Map 
                graves={graves} 
                selectedGraveID={selectedGraveID} 
                handleSelectGrave={handleSelectGrave}
                zoomFlag={zoomFlag}
                setZoomFlag={setZoomFlag}
            />
        </main>
    )
}

export default HomePage;