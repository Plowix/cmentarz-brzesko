import Spinner from "../../Decor/Spinner";
import SearchResult from './SearchResult';

function ResultBox({searchResults, handleResultClick, setShowResults, resultsLoading}){
    const handleCloseButtonClick = () =>{
        console.log(searchResults);
        setShowResults(false);
    }

    return(
        <div className="result-box">
            <div className="result-box-header"> 
                <h2>Wyniki</h2> 
                <button onClick={handleCloseButtonClick} className='result-close-button'>X</button>
            </div>
            <hr />

            <div className={"search-result-container" + ((resultsLoading || searchResults.length==0) ? ' center-flex' : '')}>
            {resultsLoading ? <Spinner/> :
            searchResults.length > 0 ?
                    searchResults.map((person, index) => (
                        <SearchResult personData={person} handleResultClick={handleResultClick}/>
                    ))
                : <p>Brak wyników dla podanych kryteriów</p>}
            </div>
        </div>
    )
}

export default ResultBox;