import { useState } from 'react';
import PersonForm from './PersonForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import heic2any from "heic2any";
import proj4 from "proj4";

function GraveForm() {
    const [graveData, setGraveData] = useState({
        sectorNumber: '',
        graveNumber: '',
        xCoord: '',
        yCoord: '',
        image: null,
    });
    const [peopleData, setPeopleData] = useState([]);

    const handleGraveInputChange = (e, field) => {
        const { value } = e.target;
        setGraveData((prevData) => ({
            ...prevData,
            [field]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setGraveData((prevData) => ({
           ...prevData,
           image: file 
        }));
    };

    const addPerson = () => {
        setPeopleData([...peopleData, {
            fullName: '',
            birthYear: '',
            birthMonth: '',
            birthDay: '',
            deathYear: '',
            deathMonth: '',
            deathDay: '',
        }]);
    };

    const updatePerson = (index, updatedPerson) => {
        const updatedPeople = [...peopleData];
        updatedPeople[index] = updatedPerson;
        setPeopleData(updatedPeople);
    };

    const removePerson = (index) => {
        const updatedPeople = peopleData.filter((_, i) => i !== index);
        setPeopleData(updatedPeople);
    };

    const handleAddPerson = (e) => {
        e.preventDefault();
        addPerson();
    };

    const apiUrl = process.env.REACT_APP_API_URL;

    const convertImageToJPG = (file) => {
        return new Promise((resolve, reject) => {
            if (file.type === 'image/heic') {
                heic2any({ blob: file, toType: 'image/jpeg' })
                    .then((convertedBlob) => {
                        resolve(convertedBlob);
                    })
                    .catch((err) => reject('Błąd konwersji HEIC: ' + err));
            } else {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const img = new Image();
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0);
        
                        canvas.toBlob((blob) => {
                            resolve(blob);
                        }, 'image/jpeg'); 
                    };
                    img.src = reader.result;
                };

                reader.onerror = () => reject('Błąd wczytywania obrazu');
                reader.readAsDataURL(file);
            }
        });
    };

    const puwg2000 = "+proj=tmerc +lat_0=0 +lon_0=21 +k=0.999923 +x_0=7500000 +y_0=0 +ellps=GRS80 +units=m +no_defs";
    const wgs84 = proj4.defs("EPSG:4326");

    function convertPUWG2000toWGS84(x, y) {
        try {
            const [lon, lat] = proj4(puwg2000, wgs84, [x, y]);
            return [lat, lon];
        } catch (error) {
            throw new Error("Nie udało się przekształcić współrzędnych: " + error.message);
        }
    }

    const submitGrave = async () => {
        const graveId = `${graveData.sectorNumber}/${String(graveData.graveNumber).padStart(3, '0')}`;
    
        const formData = new FormData();
        formData.append('graveId', graveId);

        const newCoords = convertPUWG2000toWGS84(parseFloat(graveData.xCoord), parseFloat(graveData.yCoord));
        formData.append('xCoord', newCoords[0]);
        formData.append('yCoord', newCoords[1]);
    
        if (graveData.image) {
            try {
                const convertedImage = await convertImageToJPG(graveData.image);
                const fileName = `${graveId}.jpg`; 
                formData.append('image', convertedImage, fileName);
            } catch (error) {
                console.error('Error converting image:', error);
                return; 
            }
        }
    
        try {
            const graveResponse = await fetch(`${apiUrl}`, {
                method: 'POST',
                body: formData,
            });
    
            if (!graveResponse.ok) {
                throw new Error('Błąd podczas wysyłania danych grobu');
            }
    
            await submitPeople(graveId);
        } catch (error) {
            console.error('Error while submitting grave data:', error);
        }
    };

    const submitPeople = async (graveId) => {
        try {
            for (const person of peopleData) {
                console.log(person);
    
                const birthYear = person.birthYear || 0;
                const birthMonth = person.birthMonth || 0;
                const birthDay = person.birthDay || 0;
        
                const deathYear = person.deathYear || 0;
                const deathMonth = person.deathMonth || 0;
                const deathDay = person.deathDay || 0;
    
                const formData = new FormData();
                formData.append('graveId', graveId);
                formData.append('fullName', person.fullName);
                formData.append('birthYear', birthYear);
                formData.append('birthMonth', birthMonth);
                formData.append('birthDay', birthDay);
                formData.append('deathYear', deathYear);
                formData.append('deathMonth', deathMonth);
                formData.append('deathDay', deathDay);
    
                console.log("Sending formData:", formData);
    
                const response = await fetch(`${apiUrl}`, {
                    method: 'POST',
                    body: formData,
                });
    
                if (!response.ok) {
                    throw new Error('Błąd podczas wysyłania danych osoby');
                }
            }
    
            alert('Grób oraz osoby zostały pomyślnie zapisane!');
        } catch (error) {
            console.error('Error while submitting people data:', error);
        }
    };
    

    return (
        <form className="add-grave-form" onSubmit={(e) => { e.preventDefault(); submitGrave(); }}>
            <h2>Dodaj grób</h2>
            <div className="grave-data">
                <div className="grave-data-top-container">
                    <div className='input-container'>
                        <label htmlFor="sector-number">Sektor:</label>
                        <input
                            type="number"
                            id="sector-number"
                            value={graveData.sectorNumber}
                            onChange={(e) => handleGraveInputChange(e, 'sectorNumber')}
                            required
                        />
                    </div>
                    <p className="grave-id-separator">/</p>
                    <div className='input-container'>
                        <label htmlFor="grave-number">Numer:</label>
                        <input
                            type="number"
                            id="grave-number"
                            value={graveData.graveNumber}
                            onChange={(e) => handleGraveInputChange(e, 'graveNumber')}
                            required
                        />
                    </div>
                </div>

                <div className="coordinate-container">
                    <div className='input-container'>
                        <label htmlFor="x-coord">X:</label>
                        <input
                            type="number"
                            id="x-coord"
                            value={graveData.xCoord}
                            onChange={(e) => handleGraveInputChange(e, 'xCoord')}
                            required
                        />
                    </div>
                    <div className='input-container'>
                        <label htmlFor="y-coord">Y:</label>
                        <input
                            type="number"
                            id="y-coord"
                            value={graveData.yCoord}
                            onChange={(e) => handleGraveInputChange(e, 'yCoord')}
                            required
                        />
                    </div>
                </div>

                <div className="input-container">
                    <label htmlFor="grave-image">Zdjęcie grobu:</label>
                    <input 
                        type="file"
                        id="grave-image" 
                        accept="image/png, image/jpeg, image/heic"
                        onChange={handleFileChange}
                    />
                </div>
            </div>

            <br />
            <h2>Dodaj pochowanych</h2>
            <div className="person-data">
                <button 
                    className='btn btn-outline-secondary add-person-button'
                    onClick={handleAddPerson}
                >
                    <FontAwesomeIcon icon={faPlus} />&nbsp;Dodaj osobę pochowaną
                </button>

                {peopleData.map((person, index) => (
                    <PersonForm
                        key={index}
                        person={person}
                        onUpdate={(updatedPerson) => updatePerson(index, updatedPerson)}
                        onRemove={() => removePerson(index)}
                    />
                ))}
            </div>

            <hr />

            <button className='btn btn-outline-secondary submit-grave-button'>
                Dodaj grób
            </button>
        </form>
    );
}

export default GraveForm;
