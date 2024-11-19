function GraveInfo(props){
    return(
        <div className="grave-information-panel">
            <h2>Wybrałeś {props.data.id}</h2>
            <hr />
        </div>
    )
}

export default GraveInfo;