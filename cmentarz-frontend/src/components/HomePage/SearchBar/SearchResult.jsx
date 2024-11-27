import { formatDate } from "../../../utils/DateUtils";

function searchResult({personData, handleResultClick}){
    return(
        <div 
            className="search-result"
            onMouseDown={(e)=>{
                e.preventDefault();
                handleResultClick(personData.grave_id)
            }}
            >
            <img src={process.env.REACT_APP_URL+"/images/graves/"+(personData.grave_id.replace("/", "_"))+".jpg"} alt="" />
            <h5 className="search-result-name">śp. {personData.full_name}</h5>
            <i><b>ur.</b> {formatDate(personData.birth_date)}</i>
            <i><b>zm.</b> {formatDate(personData.death_date)}</i>
        </div>
    )
}

export default searchResult;