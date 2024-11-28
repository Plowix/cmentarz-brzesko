import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function PersonForm({ person, onUpdate, onRemove }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onUpdate({ ...person, [name]: value }); 
    };

    return(
        <div className="person-container">
            <div className='input-container'>
                <label>Imię i nazwisko:</label>
                <input
                    type="text"
                    className="full-name-input"
                    name="fullName"
                    value={person.fullName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="dates-input-container">
            <div className="birth-inputs-container">
                <h4>Data urodzenia</h4>&nbsp;
                <input
                    type="number"
                    className='day-input'
                    name="birthDay"
                    value={person.birthDay}
                    onChange={handleChange}
                    placeholder='dd'
                    required
                />
                <input
                    type="number"
                    className='month-input'
                    name="birthMonth"
                    value={person.birthMonth}
                    onChange={handleChange}
                    placeholder='mm'
                    required
                />
                <input
                    type="number"
                    className='year-input'
                    name="birthYear"
                    value={person.birthYear}
                    onChange={handleChange}
                    placeholder='yyyy'
                    required
                />
            </div>
            <div className="death-inputs-container">
                <h4>Data zgonu</h4>&nbsp;
                <input
                    type="number"
                    className='day-input'
                    name="deathDay"
                    value={person.deathDay}
                    onChange={handleChange}
                    placeholder='dd'
                    required
                />
                <input
                    type="number"
                    className='month-input'
                    name="deathMonth"
                    value={person.deathMonth}
                    onChange={handleChange}
                    placeholder='mm'
                    required
                />
                <input
                    type="number"
                    className='year-input'
                    name="deathYear"
                    value={person.deathYear}
                    onChange={handleChange}
                    placeholder='yyyy'
                    required
                />
            </div>
            </div>
            <button className="delete-person-entry-button" type="button" onClick={onRemove}>
                <FontAwesomeIcon icon={faXmark}/>
            </button>
        </div>
    );
}

export default PersonForm;
