function PersonInfo({personData}){
    function formatDate(dateString){
        const [year, month, day] = dateString.split("-");

        return `${day}.${month}.${year}r.`;
    }

    return(
        <div className="person-info">
            <h4>{personData.full_name}</h4>
            <i>{personData.birth_date} - {personData.death_date}</i>
            <hr />
        </div>
    )
}

export default PersonInfo;