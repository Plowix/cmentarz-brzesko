import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import './Map.css';

import GraveInfoEmpty from './GraveInformationPanel/GraveInfoEmpty';
import GraveInfo from './GraveInformationPanel/GraveInfo';
import GraveMarker from './GraveMarker';

import { useState, useEffect } from 'react';
import { L, map } from 'leaflet';

//zwraca skalę zależną od zoomu mapy
function getMult(zoom) {
    const baseZoom = 20;
    
    let zoomDifference = zoom - baseZoom;
    
    if (zoomDifference < 0) {
        return Math.pow(2, zoomDifference); 
    } else {
        return Math.pow(2, zoomDifference); 
    }
}
    
function Map({graves, selectedGraveID, handleSelectGrave, zoomFlag, setZoomFlag}){
    const [sizeMult, setSizeMult] = useState(1);

    //zoomuje do nowo wybranego grobu
    function GraveSelectionHandler(){
        const map = useMap();
        useEffect(() => {
            if(zoomFlag==false) return;
            if(selectedGraveID == "0") return;
            let graveCoordinates = [];
            for(let i = 0; i < graves.length; i++){
                if(graves[i].id === selectedGraveID){
                    graveCoordinates = [graves[i].position[0], graves[i].position[1]];
                    break;
                }
            }
            const handleZoom = () => {
                const zoom = 21;
                const newMult = getMult(zoom);
                setSizeMult(newMult);
            };
            handleZoom();

            map.flyTo(graveCoordinates, 21);
            
            setZoomFlag(false);
        }, [selectedGraveID]);

        return null;
    }


    //zmienia skalę wyświetlanych ikon w zależności od zoomu
    function ZoomChangeHandler() {
        const map = useMap();     
        useEffect(() => {
            const handleZoom = () => {
                const zoom = map.getZoom();
                const newMult = getMult(zoom);
                setSizeMult(newMult);
            };

          let center = map.getCenter();
    
          map.on("zoom", handleZoom); 
          handleZoom();
          return () => {
            map.off("zoom", handleZoom);
          }
        }, [map]);
    
        return null;
    }

    return(
        <div className="map-container">
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
                <GraveSelectionHandler/>
                <ZoomChangeHandler/>
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
            {selectedGraveID === "0" ? <GraveInfoEmpty/> : <GraveInfo selectedGraveId={selectedGraveID}/>}
        </div>
    )
}

export default Map;