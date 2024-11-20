import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import './Map.css';

import GraveInfoEmpty from './GraveInformationPanel/GraveInfoEmpty';
import GraveInfo from './GraveInformationPanel/GraveInfo';
import GraveMarker from './GraveMarker';

import { useState, useEffect } from 'react';
import { L, map } from 'leaflet';

function getMult(zoom){
    /*
     zwraca skalę w jakiej powinny być przedstawione groby 
     w zależności od zoomu mapy 
    */
    let baseMult = 1;
    let baseZoom = 20;
    if(zoom < baseZoom){
        while(baseZoom > zoom){
            baseMult/=1.5;
            zoom++;
        }
    }
    else{
        while(baseZoom < zoom){
            baseMult*=1.5;
            zoom--;
        }
    }

    return baseMult;
}
    

function Map({graves, selectedGraveID, handleSelectGrave}){
    const [sizeMult, setSizeMult] = useState(1);


    //zoomuje do nowo wybranego grobu
    function GraveSelectionHandler(){
        const map = useMap();
        useEffect(() => {
            if(selectedGraveID == -1) return;
            let graveCoordinates = [];
            for(let i = 0; i < graves.length; i++){
                if(graves[i].id === selectedGraveID){
                    graveCoordinates = [graves[i].position[0], graves[i].position[1]];
                    break;
                }
            }

            map.flyTo(graveCoordinates);
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
    
          map.on("zoomend", handleZoom); 
          handleZoom();
          return () => map.off("zoomend", handleZoom);
        }, [map]);
    
        return null;
    }

    return(
        <div className="map-container">
            <MapContainer id="map" center={[49.969450, 20.604549] } zoomSnap={0.25} maxZoom={24} zoom={window.innerWidth>=600 ? 19 : 18.5}>
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
            {selectedGraveID === -1 ? <GraveInfoEmpty/> : <GraveInfo selectedGraveId={selectedGraveID}/>}
        </div>
    )
}

export default Map;