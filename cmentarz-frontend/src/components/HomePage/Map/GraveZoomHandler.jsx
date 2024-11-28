//po wybraniu grobu przesuwa do niego mapę i zoomuje

import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

function GraveZoomHandler({graves, selectedGraveID, zoomFlag, setZoomFlag}){
    const map = useMap();
    useEffect(() => {
        if(zoomFlag===false) return;
        if(selectedGraveID === "0") return;
        let graveCoordinates = [];
        for(let i = 0; i < graves.length; i++){
            if(graves[i].id === selectedGraveID){
                graveCoordinates = [graves[i].position[0], graves[i].position[1]];
                break;
            }
        }

        map.flyTo(graveCoordinates, Math.max(21, map.getZoom()));
        
        setZoomFlag(false);
    }, [selectedGraveID, zoomFlag]);

    return null;
}

export default GraveZoomHandler;