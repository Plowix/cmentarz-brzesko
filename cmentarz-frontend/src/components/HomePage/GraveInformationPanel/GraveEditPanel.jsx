import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function GraveEditPanel({graveID}){

    const apiUrl = process.env.REACT_APP_API_URL
    const navigate = useNavigate();

    const handleDeleteGrave = async()=>{
        try {
            const response = await fetch(`${apiUrl}/?delete_grave_id=${graveID}`, {
                method: 'GET',
                credentials: 'include'
            });    

            if (response.ok) {
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleEditGrave = () =>{
        navigate(`/dodaj-dane?edit-id=${encodeURIComponent(graveID)}`);
    }

    return(
        <div className="admin-panel-container">
            <button onClick={handleDeleteGrave} className='delete-grave-button'><FontAwesomeIcon icon={faTrash} /></button>
            <button onClick={handleEditGrave} className='edit-grave-button'><FontAwesomeIcon icon={faPenToSquare} /></button>
        </div>
    )
}

export default GraveEditPanel;