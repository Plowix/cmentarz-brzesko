import { useState, useEffect } from 'react';
import SearchResult from './SearchResult';

function MapSearchBar({handleSelectGrave}){
    const [searchQuery, setSearchQuery] = useState('');

    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setSearchFlag] = useState(false);

    const [selectedResultID, setSelectedResultID] = useState(-1);

    const handleInputChange = (e) => {
        setSelectedResultID(-1);
        setSearchQuery(e.target.value);
        setSearchFlag(true);
    };

    const handleFocus = () =>{
        setSelectedResultID(-1);
        setSearchFlag(true);
    }

    const handleBlur = () => {
        setSearchFlag(false);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowUp') {
            if(selectedResultID>0) setSelectedResultID(prevID => prevID-1);
        } 
        else if (event.key === 'ArrowDown') {
            if(selectedResultID<searchResults.length-1) setSelectedResultID(prevID => prevID+1);
        } 
        else if (event.key === 'Enter') {
            if(selectedResultID>=0 && selectedResultID<searchResults.length){
                handleResultClick(searchResults[selectedResultID].grave_id);
            }
        }
    };

    function handleResultClick(newSelectedID){
        handleSelectGrave(newSelectedID);
        setSelectedResultID(-1);
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
            onKeyDown={handleKeyDown}
            />
            {searchResults.length > 0 && (
                <div className="search-result-container">
                    {isSearching && searchResults.map((person, index) => (
                        <SearchResult isSelected={index==selectedResultID} personData={person} handleResultClick={handleResultClick}/>
                    ))}
                </div>
            )}
        </div>
        
    )
}

export default MapSearchBar;