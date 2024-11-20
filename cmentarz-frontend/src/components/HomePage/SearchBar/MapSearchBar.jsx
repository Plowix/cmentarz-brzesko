import { useState, useEffect } from 'react';
import SearchResult from './SearchResult';

function MapSearchBar({handleSelectGrave}){
    const [searchQuery, setSearchQuery] = useState('');

    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setSearchFlag] = useState(false);

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
        setSearchFlag(true);
    };

    const handleFocus = () =>{
        setSearchFlag(true);
    }

    const handleBlur = () => {
        setSearchFlag(false);
    }

    function handleResultClick(newSelectedID){
        handleSelectGrave(newSelectedID);
        setSearchFlag(false);
    }

    const apiUrl = process.env.REACT_APP_API_URL

    useEffect(() => {
        if (searchQuery.trim() === '' || !isSearching) {
            setSearchResults([]);
            return;
        }
        else{
            setSearchFlag(true);
            fetch(apiUrl+'/?search_query='+encodeURIComponent(searchQuery))
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Błąd podczas pobierania danych");
                }
                return response.json();
            })
            .then((data) => setSearchResults(data))
            .catch((error) => console.error("Błąd:", error));
        }
    }, [searchQuery, isSearching]);

    return(
        <div className='search-bar-container'>
            <input 
            type="text" 
            className="map-search-bar" 
            placeholder="Wyszukaj osobę pochowaną na cmentarzu..."
            value={searchQuery}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleInputChange}
            />
            {searchResults.length > 0 && (
                <div className="search-result-container">
                    {isSearching && searchResults.map((person, index) => (
                        <SearchResult personData={person} handleResultClick={handleResultClick}/>
                    ))}
                </div>
            )}
        </div>
        
    )
}

export default MapSearchBar;