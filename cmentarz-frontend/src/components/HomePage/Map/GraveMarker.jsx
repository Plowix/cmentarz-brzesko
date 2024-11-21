import L from 'leaflet';
import { Marker } from 'react-leaflet';
import { useState, useEffect } from 'react';

function numberedDivIcon(grave, isSelected, fontSize){
    const text = getGraveNumber(grave);
    const textWidth = text.length * fontSize * 0.6; 
    const iconSize = [fontSize, textWidth];
    const iconAnchor = [iconSize[0]/2, iconSize[1]/2];

    return L.divIcon(
        {
            className: isSelected ? 'grave-marker-icon selected-icon' : 'grave-marker-icon',
            html: `<span style="font-size: ${fontSize}px;">${text}</span>`,
        }
    )
}

function getGraveNumber(grave){
    return Number(grave.id.split('/')[1]);
}

const baseMarkerFontSize = 15;

function GraveMarker({graveData, isSelected, handleSelectGrave, sizeMult}){        
    const [markerIcon, setMarkerIcon] = useState(numberedDivIcon(graveData, isSelected, baseMarkerFontSize*sizeMult));
    useEffect(() => {
        const icon = numberedDivIcon(graveData, isSelected, baseMarkerFontSize*sizeMult);
        setMarkerIcon(icon);
    }, [sizeMult, isSelected]);
    
    return(
        <Marker 
            key={graveData.id} 
            position={graveData.position}
            icon={markerIcon}
            eventHandlers={
            {click: () =>{
                handleSelectGrave(graveData.id)
            }
            }}>
        </Marker>
    )
}

export default GraveMarker;