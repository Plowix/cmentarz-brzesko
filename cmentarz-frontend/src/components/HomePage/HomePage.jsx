import { useState, useEffect } from 'react';

import MapSearchBar from "./MapSearchBar";
import Map from "./Map";

function HomePage(){
    const [graves, setGraves] = useState([]);
    const [selectedGraveID, setSelectedGraveID] = useState(-1);

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
    }

    return(
        <main>
            <MapSearchBar/>
            <Map 
                graves={graves} 
                selectedGraveID={selectedGraveID} 
                handleSelectGrave={handleSelectGrave}
            />
        </main>
    )
}

export default HomePage;