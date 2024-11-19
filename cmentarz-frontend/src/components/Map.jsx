import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.css';

import GraveInfoEmpty from './GraveInfoEmpty';
import GraveInfo from './GraveInfo';

function Map(props){
    return(
        <div className="map-container">
            <MapContainer id="map" center={[49.969450, 20.604549]} maxZoom={24} zoom={19}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                    maxNativeZoom={20}
                    maxZoom={24}
                />
                {props.graves.map(function(grave){
                    return(
                        <Marker 
                            key={grave.id} 
                            position={grave.position}
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