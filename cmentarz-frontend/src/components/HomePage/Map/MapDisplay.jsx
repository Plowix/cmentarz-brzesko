import { MapContainer, TileLayer } from 'react-leaflet';
import { useState } from 'react';

import GraveMarker from './GraveMarker';
import GraveZoomHandler from './GraveZoomHandler';
import ZoomScaleHandler from './ZoomScaleHandler';

function MapDisplay({graves, selectedGraveID, zoomFlag, setZoomFlag, handleSelectGrave}){
    const [sizeMult, setSizeMult] = useState(1);

    return(
        <MapContainer 
                id="map" 
                wheelPxPerZoomLevel={200}
                center={[49.969450, 20.604549] } 
                zoomSnap={0.25} 
                maxZoom={24} 
                zoom={window.innerWidth>=600 ? 19 : 18.5}
                >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                    maxNativeZoom={20}
                    maxZoom={24}
                />
                <GraveZoomHandler
                    graves={graves}
                    selectedGraveID={selectedGraveID}
                    zoomFlag={zoomFlag}
                    setZoomFlag={setZoomFlag}
                />
                <ZoomScaleHandler
                    setSizeMult={setSizeMult}
                />
                {graves.map(function(grave){
                    return(
                        <GraveMarker
                            graveData={grave}
                            isSelected={grave.id === selectedGraveID}
                            handleSelectGrave={handleSelectGrave}
                            sizeMult={sizeMult}
                        />
                    )
                })}
            </MapContainer>
    )
}

export default MapDisplay;