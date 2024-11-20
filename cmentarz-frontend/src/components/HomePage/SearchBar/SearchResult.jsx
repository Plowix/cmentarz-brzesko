function searchResult({personData, handleResultClick}){
    return(
        <div 
            className="search-result"
            onMouseDown={(e)=>{
                e.preventDefault();
                handleResultClick(personData.grave_id)
            }}
            >
            <h5 className="search-result-name">{personData.full_name}</h5>
            <i>zm. {personData.death_date}</i>
        </div>
    )
}

export default searchResult;