import { useState } from 'react';

function GraveForm(){
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

    const handleFileChange = (e)=>{
        const file = e.target.files[0];
        setGraveData((prevData) => ({
           ...prevData,
           image: file 
        }))
    }

    const addPerson = ()=>{
        setPeopleData([...peopleData, 
            {
                fullName: '',
                birth_year: '',
                birth_month: '',
                birth_day: '',
                death_year: '',
                death_month: '',
                death_day: '',
            }
        ])
    }

    const handleAddPerson = (e) =>{
        e.preventDefault();
    }

    return(
        <form className="add-grave-form">
            <h2>Dodaj grób</h2>
            <div className="grave-data">
            <div className="grave-data-top-container">
                <div className='input-container'>
                        <label htmlFor="sector-number">Sektor:</label>
                        <input
                            type="number"
                            id="sector-number"
                            value={graveData.sectorNumber}
                            onChange={(e)=>handleGraveInputChange(e, 'sectorNumber')}
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
                        onChange={(e)=>handleGraveInputChange(e, 'graveNumber')}
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
                            onChange={(e)=>handleGraveInputChange(e, 'xCoord')}
                            required
                        />
                    </div>
                <div className='input-container'>
                    <label htmlFor="y-coord">Y:</label>
                    <input
                        type="number"
                        id="y-coord"
                        value={graveData.yCoord}
                        onChange={(e)=>handleGraveInputChange('yCoord')}
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
                    onClick={(e) => handleAddPerson(e)}
                    >
                        Dodaj osobę pochowaną</button>
            </div>

            <hr />

            <button
                className='btn btn-outline-secondary submit-grave-button'>
                Dodaj grób
            </button>
        </form>
    )
}

export default GraveForm;