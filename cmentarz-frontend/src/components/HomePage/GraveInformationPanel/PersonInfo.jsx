import { formatDate } from "../../../utils/DateUtils";

function PersonInfo({personData}){
    return(
        <div className="person-info">
            <h4 className="person-info-name">śp. {personData.full_name}</h4>
            <div className="person-info-dates">
            <i className="date-container"><b>ur.</b> {formatDate(personData.birth_date)}</i> <br />
            <i className="date-container"><b>zm.</b> {formatDate(personData.death_date)}</i>
            </div>
        </div>
    )
}

export default PersonInfo;