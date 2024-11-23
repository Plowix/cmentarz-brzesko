import { useEffect, useState } from 'react';

import AdvancedSearchForm from './AdvancedSearchForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SearchBarForm({ setSearchResults, setShowResults, setResultsLoading }) {
    const [formData, setFormData] = useState({
        fullName: '',
        birthDay: '',
        birthMonth: '',
        birthYear: '',
        deathDay: '',
        deathMonth: '',
        deathYear: '',
    });

    const [errors, setErrors] = useState({
        fullName: '',
        birthDay: '',
        birthMonth: '',
        birthYear: '',
        deathDay: '',
        deathMonth: '',
        deathYear: '',
    });

    const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);

    const apiUrl = process.env.REACT_APP_API_URL;

    const handleInputChange = (e, field) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [field]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (formData.fullName.trim() === '' && formData.birthDay === '' && formData.birthMonth === '' && formData.birthYear === '' && formData.deathDay === '' && formData.deathMonth === '' && formData.deathYear ==='') {
            newErrors.fullName = 'Imię i nazwisko jest wymagane';
        }

        if (formData.birthMonth !== '' && (isNaN(formData.birthMonth) || formData.birthMonth < 1 || formData.birthMonth > 12)) {
            newErrors.birthMonth = 'Miesiąc musi być liczbą od 1 do 12';
        }
        if (formData.birthDay !== '' && (isNaN(formData.birthDay) || formData.birthDay < 1 || formData.birthDay > 31)) {
            newErrors.birthDay = 'Dzień musi być liczbą od 1 do 31';
        }
        if(formData.birthYear !== '' && isNaN(formData.birthYear)){
            newErrors.birthYear = "Rok musi być liczbą";
        }

        if (formData.deathMonth !== '' && (isNaN(formData.deathMonth) || formData.deathMonth < 1 || formData.deathMonth > 12)) {
            newErrors.deathMonth = 'Miesiąc musi być liczbą od 1 do 12';
        }
        if (formData.deathDay !== '' && (isNaN(formData.deathDay) || formData.deathDay < 1 || formData.deathDay > 31)) {
            newErrors.deathDay = 'Dzień musi być liczbą od 1 do 31';
        }
        if(formData.deathYear !== '' && isNaN(formData.deathYear)){
            newErrors.deathYear = "Rok musi być liczbą";
        }

        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; 
    };

    const handleSearch = (e) => {
        setShowResults(true);
        setResultsLoading(true);
        e.preventDefault();
    
        if (validateForm()) {
            let searchQuery = apiUrl + '/?search_query=' + encodeURIComponent(formData.fullName);
            
            if (isAdvancedSearch) {
                const advancedSearchParams = buildSearchParams();
                searchQuery += advancedSearchParams;
            }
    
            fetch(searchQuery)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Błąd podczas pobierania danych");
                    }
                    return response.json();
                })
                .then((data) => {
                    setSearchResults(data);
                    setResultsLoading(false);
                })
                .catch((error) => console.error("Błąd:", error));
        }
    };
    
    const buildSearchParams = () => {
        let params = '';
        
        if (formData.birthDay) {
            params += `&birth_day=${encodeURIComponent(formData.birthDay)}`;
        }
        if (formData.birthMonth) {
            params += `&birth_month=${encodeURIComponent(formData.birthMonth)}`;
        }
        if (formData.birthYear) {
            params += `&birth_year=${encodeURIComponent(formData.birthYear)}`;
        }
    
        if (formData.deathDay) {
            params += `&death_day=${encodeURIComponent(formData.deathDay)}`;
        }
        if (formData.deathMonth) {
            params += `&death_month=${encodeURIComponent(formData.deathMonth)}`;
        }
        if (formData.deathYear) {
            params += `&death_year=${encodeURIComponent(formData.deathYear)}`;
        }
    
        return params;
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch(e);
        }
    };

    const handleAdvancedSearchToggle = (e) => {
        e.preventDefault();
        setIsAdvancedSearch(!isAdvancedSearch);
    };

    useEffect(()=>{
        validateForm();
    }, [formData]);

    const isSearchDisabled = Object.values(errors).some((error) => error !== ''); 

    return (
        <form
            className='search-bar-form'
            onSubmit={handleSearch}
        >
            <div className="top-part">
                <input
                    type="text"
                    className={`map-search-bar`}
                    placeholder="Wyszukaj osobę pochowaną na cmentarzu..."
                    value={formData.fullName}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => handleInputChange(e, 'fullName')}
                />
                <button
                    className='btn btn-outline-secondary advanced-search-toggle'
                    onClick={handleAdvancedSearchToggle}
                >
                    {isAdvancedSearch ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
                </button>
                <button
                    className='btn btn-outline-secondary search-button'
                    onClick={handleSearch}
                    disabled={isSearchDisabled}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} /> 
                    <span className='search-button-desktop-content'>&nbsp;Szukaj</span>
                </button>
            </div>

            {isAdvancedSearch &&
                <AdvancedSearchForm
                    formData={formData}
                    errors={errors}
                    handleInputChange={handleInputChange}
                    handleKeyDown={handleKeyDown}
                />
                
            }
        </form>
    );
}

export default SearchBarForm;
