import { useState } from 'react';
import SearchBarForm from './SearchBarForm';
import ResultBox from './ResultBox';

import './SearchBar.css';

function MapSearchBar({handleSelectGrave}){
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [resultsLoading, setResultsLoading] = useState(false);
    

    function handleResultClick(newSelectedID){
        //tutaj dodać scrollowanie do mapy
        handleSelectGrave(newSelectedID);
    }

    return(
        <>
        <SearchBarForm
            setSearchResults={setSearchResults}
            setShowResults={setShowResults}
            setResultsLoading={setResultsLoading}
        />
        { showResults && <ResultBox
            searchResults={searchResults}
            handleResultClick={handleResultClick}
            setShowResults={setShowResults}
            resultsLoading={resultsLoading}
        /> }
        </>
    )
}

export default MapSearchBar;