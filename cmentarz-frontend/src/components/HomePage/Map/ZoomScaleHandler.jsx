//zmienia skalę wyświetlanych ikon w zależności od zoomu

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

//zwraca skalę zależną od zoomu mapy
function getMult(zoom) {
  const baseZoom = 21;
  
  let zoomDifference = zoom - baseZoom;
  
  if (zoomDifference < 0) {
      return Math.pow(2, zoomDifference); 
  } else {
      return Math.pow(2, zoomDifference); 
  }
}

function ZoomScaleHandler({setSizeMult}) {
    const map = useMap();     
    useEffect(() => {
        const handleZoom = () => {
            const zoom = map.getZoom();
            const newMult = getMult(zoom);
            setSizeMult(newMult);
        };

      map.on("zoom", handleZoom); 
      handleZoom();
      return () => {
        map.off("zoom", handleZoom);
      }
    }, [map]);

    return null;
}

export default ZoomScaleHandler;