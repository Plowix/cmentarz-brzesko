import L from 'leaflet';
import { Marker } from 'react-leaflet'
import crossImage from './cross.png';
import selectedCrossImage from './cross-selected.png';

const iconSize = [24, 32];

//zwraca ikonę o src image przeskalowaną do zoomu
function createDynamicIcon(sizeMult, image){
    let newSize = [iconSize[0] * sizeMult, iconSize[1] * sizeMult];
    return new L.Icon({
        iconUrl: image,
        iconSize: newSize,
        iconAnchor: [newSize[0]/2, newSize[1]/2]
    })
}

function GraveMarker({graveData, isSelected, handleSelectGrave, sizeMult}){
    return(
        <Marker 
            key={graveData.id} 
            position={graveData.position}
            icon={isSelected ? createDynamicIcon(sizeMult, selectedCrossImage) : createDynamicIcon(sizeMult, crossImage)}
            eventHandlers={
            {click: () =>{
                handleSelectGrave(graveData.id)
            }
            }}>
        </Marker>
    )
}

export default GraveMarker;