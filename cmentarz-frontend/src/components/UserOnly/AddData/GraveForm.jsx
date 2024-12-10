import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import heic2any from "heic2any";
import proj4 from "proj4";

import PersonForm from './PersonForm';

function GraveForm() {
    const navigate = useNavigate();

    const [editGraveID, setEditGraveId] = useState('0');
    const [responseText, setResponseText] = useState('');

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

    const location = useLocation();
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const editId = searchParams.get('edit-id');
        if (editId) {
            setEditGraveId(editId); 
        }
        else setEditGraveId('0')
    }, [location]);

    const parseDate = (date) => {
        if (!date) return { year: '', month: '', day: '' };
        const [year, month, day] = date.split('-');
        return { year, month, day };
    };

    const apiUrl = process.env.REACT_APP_API_URL;

    const convertImageToJPG = (file, quality = 0.35) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
    
            reader.onload = () => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
    
                    canvas.width = img.width;
                    canvas.height = img.height;
    
                    ctx.drawImage(img, 0, 0);
    
                    canvas.toBlob(
                        (blob) => {
                            if (blob) {
                                resolve(new File([blob], file.name.replace(/\.[^/.]+$/, ".jpg"), { type: 'image/jpeg' }));
                            } else {
                                reject(new Error('Nie udało się przekonwertować obrazu na JPG.'));
                            }
                        },
                        'image/jpeg',
                        quality
                    );
                };
                img.onerror = (err) => reject(err);
                img.src = reader.result;
            };
    
            reader.onerror = (err) => reject(err);
            reader.readAsDataURL(file);
        });
    };
    

    const puwg2000 = "+proj=tmerc +lat_0=0 +lon_0=21 +k=0.999923 +x_0=7500000 +y_0=0 +ellps=GRS80 +units=m +no_defs";
    const wgs84 = "+proj=longlat +datum=WGS84 +no_defs";

    function convertPUWG2000toWGS84(x, y) {
        try {
            const [lon, lat] = proj4(puwg2000, wgs84, [x, y]); 
            return [lat, lon];
        } catch (error) {
            throw new Error("Nie udało się przekształcić współrzędnych: " + error.message);
        }
    }

    function convertWGS84toPUWG2000(lat, lon) {
        try {
            const [x, y] = proj4(wgs84, puwg2000, [lon, lat]); 
            return [x, y]; 
        } catch (error) {
            throw new Error("Nie udało się przekształcić współrzędnych: " + error.message);
        }
    }


    useEffect(() => {
        if (editGraveID !== '0') {
            fetch(`${apiUrl}/?grave_id=${encodeURIComponent(editGraveID)}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Błąd podczas pobierania danych");
                    }
                    return response.json();
                })
                .then((data) => {
                    const [xCoord, yCoord] = convertWGS84toPUWG2000(
                        parseFloat(data.location[0]), 
                        parseFloat(data.location[1])  
                    );
    
                    setGraveData({
                        sectorNumber: data.id.split('/')[0],
                        graveNumber: data.id.split('/')[1],
                        xCoord: xCoord, 
                        yCoord: yCoord,
                        image: null,
                    });
    
                    const people = data.people.map((person) => ({
                        fullName: person.full_name,
                        birthYear: parseDate(person.birth_date).year,
                        birthMonth: parseDate(person.birth_date).month,
                        birthDay: parseDate(person.birth_date).day,
                        deathYear: parseDate(person.death_date).year,
                        deathMonth: parseDate(person.death_date).month,
                        deathDay: parseDate(person.death_date).day,
                    }));
                    setPeopleData(people);
                })
                .catch((error) => console.error("Błąd:", error));
        }
    }, [editGraveID]);
    
    

    const submitGrave = async () => {
        const graveId = `${graveData.sectorNumber}/${String(graveData.graveNumber).padStart(3, '0')}`;
    
        const formData = new FormData();
        formData.append('graveId', graveId);
    
        const [lon, lat] = convertPUWG2000toWGS84(
            parseFloat(graveData.xCoord),
            parseFloat(graveData.yCoord)
        );
    
        formData.append('xCoord', lon); 
        formData.append('yCoord', lat); 
    
        if (graveData.image) {
            try {
                const convertedImage = await convertImageToJPG(graveData.image, 0.35);
                const fileName = `${graveId}.jpg`;
                formData.append('image', convertedImage, fileName);
            } catch (error) {
                console.error("Error converting image:", error);
                return;
            }
        }
    
        try {
            const graveResponse = await fetch(`${apiUrl}/post.php`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            setResponseText(await graveResponse.json());

    
            if (!graveResponse.ok) {
                throw new Error("Błąd podczas wysyłania danych grobu");
            }
    
            await submitPeople(graveId);

            navigate('/?id='+encodeURIComponent(graveId));
        } catch (error) {
            console.error("Error while submitting grave data:", error);
        }
    };
    

    const submitPeople = async (graveId) => {
        try {
            for (const person of peopleData) {    
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
        
                const response = await fetch(`${apiUrl}/post.php`, {
                    method: 'POST',
                    body: formData,
                    credentials: 'include'
                });

    
                if (!response.ok) {
                    throw new Error('Błąd podczas wysyłania danych osoby');
                }
            }
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
                        accept="image/png, image/jpeg"
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
                {editGraveID === '0' ? "Dodaj grób" : "Edytuj grób"}
            </button>

            <div>
                {Object.entries(responseText).map(([key, message], index) => (
                        <div key={index} className={key}>
                            {message}
                        </div>
                    ))}
            </div>
        </form>
    );
}

export default GraveForm;
