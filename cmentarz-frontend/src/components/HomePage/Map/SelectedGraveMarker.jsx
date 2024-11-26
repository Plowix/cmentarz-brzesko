import L from 'leaflet';
import { Marker } from 'react-leaflet';
import { useState, useEffect } from 'react';

function SelectedGraveMarker({graves, selectedGraveID}){ 
    let position = [];
    for(let i = 0; i < graves.length; i++){
        if(graves[i].id === selectedGraveID){
            position = graves[i].position;
        }
    }

    return(
        <Marker 
            zIndexOffset={1000}
            icon={new L.Icon.Default()}
            position={position}>
        </Marker>
    )
}

export default SelectedGraveMarker;