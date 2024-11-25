import { MapContainer, TileLayer, useMap } from 'react-leaflet';

import GraveInfoEmpty from '../GraveInformationPanel/GraveInfoEmpty';
import GraveInfo from '../GraveInformationPanel/GraveInfo';
import MapDisplay from './MapDisplay';

import { useState, useEffect } from 'react';
    
function Map({graves, selectedGraveID, handleSelectGrave, zoomFlag, setZoomFlag, setModalImage}){
    return(
        <div className="map-container">
            <MapDisplay
                graves={graves}
                selectedGraveID={selectedGraveID}
                zoomFlag={zoomFlag}
                setZoomFlag={setZoomFlag}
                handleSelectGrave={handleSelectGrave}
            />

            {selectedGraveID === "0" ? <GraveInfoEmpty/> : <GraveInfo setModalImage={setModalImage} selectedGraveId={selectedGraveID}/>}
        </div>
    )
}

export default Map;