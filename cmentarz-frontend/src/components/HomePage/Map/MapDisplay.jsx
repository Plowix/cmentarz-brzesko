import { LayersControl, FeatureGroup, MapContainer, TileLayer } from 'react-leaflet';
import { useState } from 'react';

import GraveMarker from './GraveMarker';
import SelectedGraveMarker from './SelectedGraveMarker'
import GraveZoomHandler from './GraveZoomHandler';
import ZoomScaleHandler from './ZoomScaleHandler';

import 'leaflet/dist/leaflet.css';

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
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://carto.com/attributions">CartoDB</a>'
                    maxNativeZoom={19}
                    maxZoom={22}
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

                <LayersControl position="topright">
                    <LayersControl.Overlay name="Groby" checked={false}>
                    <FeatureGroup>
                    {graves.map(function(grave){
                        return(
                            <GraveMarker
                                key={grave.id}
                                graveData={grave}
                                isSelected={grave.id === selectedGraveID}
                                handleSelectGrave={handleSelectGrave}
                                sizeMult={sizeMult}
                            />
                        )
                    })}
                    </FeatureGroup>
                </LayersControl.Overlay>
            </LayersControl>
            {selectedGraveID !== '0' && <SelectedGraveMarker
                        graves={graves}
                        selectedGraveID={selectedGraveID}
                    />}
            </MapContainer>
    )
}

export default MapDisplay;