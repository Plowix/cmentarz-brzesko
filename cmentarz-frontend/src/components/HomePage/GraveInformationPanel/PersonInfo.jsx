import { formatDate } from "../../../utils/DateUtils";

function PersonInfo({personData}){
    return(
        <div className="person-info">
            <h4 className="person-info-name">śp. {personData.full_name}</h4>
            <i><b>ur.</b> {formatDate(personData.birth_date)}</i> <br />
            <i><b>zm.</b> {formatDate(personData.death_date)}</i>
        </div>
    )
}

export default PersonInfo;