function PersonInfo(props){
    function formatDate(dateString){
        const [year, month, day] = dateString.split("-");

        return `${day}.${month}.${year}r.`;
    }

    return(
        <div className="person-info">
            <h4>{props.personData.full_name}</h4>
            <i>{formatDate(props.personData.birth_date)} - {formatDate(props.personData.death_date)}</i>
            <hr />
        </div>
    )
}

export default PersonInfo;