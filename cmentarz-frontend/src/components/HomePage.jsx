import { useState } from 'react';

import MapSearchBar from "./MapSearchBar";
import Map from "./Map";

function HomePage(){
    let graves = [
        {
            id: 0,
            position: [49.969450, 20.604549]
        },
        {
            id: 1,
            position: [49.969490, 20.604449]
        },
        {
            id: 2,
            position: [49.969400, 20.604509]
        }
      ]
    
      const [selectedGraveID, setSelectedGraveID] = useState(-1);

    return(
        <main>
            <MapSearchBar/>
            <Map 
                graves={graves} 
                selectedGraveID={selectedGraveID} 
                setSelectedGraveID={setSelectedGraveID}
            />
        </main>
    )
}

export default HomePage;