import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import MapSearchBar from "./SearchBar/MapSearchBar";
import MapContainer from "./Map/MapContainer";

import './HomePage.css';

function HomePage({user, setModalImage}){
    const [graves, setGraves] = useState([]);
    const [selectedGraveID, setSelectedGraveID] = useState("0");
    const [zoomFlag, setZoomFlag] = useState(false); //jeżeli true to mapa zoomuje do wybranego grobu
    

    const apiUrl = process.env.REACT_APP_API_URL;
    const mapContainerRef = useRef(null);
    
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
    }, [apiUrl]);

    const location = useLocation();
    useEffect(()=>{
        if(graves.length > 0){
            const GET = new URLSearchParams(location.search);
            let newId = GET.get('id');
    
            if(newId) handleSelectGrave(newId);
        }
    }, [graves])

    function handleSelectGrave(newSelectedID){
        setSelectedGraveID(newSelectedID);
        setZoomFlag(true);

        if (mapContainerRef.current) {
            mapContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    return(
        <main>
            <MapSearchBar handleSelectGrave={handleSelectGrave} />
            <div ref={mapContainerRef} className='map-container'>
            <MapContainer 
                user={user}
                graves={graves} 
                selectedGraveID={selectedGraveID} 
                handleSelectGrave={handleSelectGrave}
                zoomFlag={zoomFlag}
                setZoomFlag={setZoomFlag}
                setModalImage={setModalImage}
            />
            </div>
        </main>
    )
}

export default HomePage;