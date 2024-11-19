import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import './Map.css';

import L from 'leaflet';
import GraveInfoEmpty from './GraveInfoEmpty';
import GraveInfo from './GraveInfo';

import crossImage from './cross.png';
import selectedCrossImage from './cross-selected.png';
import { useState, useEffect } from 'react';

const iconSize = [24, 32];

function createDynamicIcon(sizeMult, image){
    let newSize = [iconSize[0] * sizeMult, iconSize[1] * sizeMult];
    return new L.Icon({
        iconUrl: image,
        iconSize: newSize,
        iconAnchor: [newSize[0]/2, newSize[1]/2]
    })
}

function getMult(zoom){
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
    

function Map(props){
    const [sizeMult, setSizeMult] = useState(1);

    function ZoomHandler() {
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
            <MapContainer id="map" center={[49.969450, 20.604549]} maxZoom={24} zoom={19}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                    maxNativeZoom={20}
                    maxZoom={24}
                />
                <ZoomHandler/>
                {props.graves.map(function(grave){
                    return(
                        <Marker 
                            key={grave.id} 
                            position={grave.position}
                            icon={grave.id == props.selectedGraveID ? createDynamicIcon(sizeMult, selectedCrossImage) : createDynamicIcon(sizeMult, crossImage)}
                            eventHandlers={
                            {click: () =>{
                                props.setSelectedGraveID(grave.id)
                            }
                            }}>
                        </Marker>
                    )
                })}
            </MapContainer>
            {props.selectedGraveID == -1 ? <GraveInfoEmpty/> : <GraveInfo data={props.graves[props.selectedGraveID]}/>}
        </div>
    )
}

export default Map;