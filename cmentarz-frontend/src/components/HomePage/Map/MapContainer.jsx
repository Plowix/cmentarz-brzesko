import GraveInfoEmpty from '../GraveInformationPanel/GraveInfoEmpty';
import GraveInfo from '../GraveInformationPanel/GraveInfo';
import MapDisplay from './MapDisplay';
    
function Map({user, graves, selectedGraveID, handleSelectGrave, zoomFlag, setZoomFlag, setModalImage}){
    return(
        <>
            <MapDisplay
                graves={graves}
                selectedGraveID={selectedGraveID}
                zoomFlag={zoomFlag}
                setZoomFlag={setZoomFlag}
                handleSelectGrave={handleSelectGrave}
            />

            {selectedGraveID === "0" ? <GraveInfoEmpty/> : <GraveInfo user={user} setModalImage={setModalImage} selectedGraveId={selectedGraveID} setZoomFlag={setZoomFlag}/>}
        </>
    )
}

export default Map;