<?php
require_once 'config.php';
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

function getPersonDate($data, $birthOrDeath){ //birth - true
    $year; $month; $day;

    if($birthOrDeath == true){
        $year = isset($data['birth_year']) ? $data['birth_year'] : "0000";
        $month = isset($data['birth_month']) ? $data['birth_month'] : "00";
        $day = isset($data['birth_day']) ? $data['birth_day'] : "00";
    }
    else{
        $year = isset($data['death_year']) ? $data['death_year'] : "0000";
        $month = isset($data['death_month']) ? $data['death_month'] : "00";
        $day = isset($data['death_day']) ? $data['death_day'] : "00";
    }

    $value = implode('-', [$year, $month, $day]);

    return $value;
}

$outputData = '';

$conn = new mysqli($server, $username, $password, $database);
if($conn -> connect_errno){
    echo 'Błąd bazy danych!';
    exit();
}

if(isset($_GET["grave_coords"])){
    $query = "SELECT id, ST_X(location) AS lat, ST_Y(location) as lng FROM graves";
    $graves = [];
    if($result = $conn -> query($query)){
        while($row = $result->fetch_assoc()){
            $graves[] = [
                'id' => $row['id'],
                'position' => [$row['lat'], $row['lng']]
            ];
            $outputData = $graves;
        }
    }
}
else if(isset($_GET["grave_id"])){
    $graveData = [
        "photo_path" => "",
        "people" => []
    ];
    
    //pobiera ścieżkę do zdjęcia grobu
    $query = "SELECT photo_path FROM graves WHERE id ='".$conn->real_escape_string($_GET["grave_id"])."'";
    if($result = $conn -> query($query)){ 
        $graveData["photo_path"] = $result->fetch_assoc()['photo_path'];
    }
    
    //pobiera dane wszystkich zmarłych w grobie
    $query = "SELECT full_name, 
                 birth_year, birth_month, birth_day, 
                 death_year, death_month, death_day 
          FROM Persons 
          WHERE grave_id = '".$conn->real_escape_string($_GET['grave_id'])."'";

    if ($result = $conn->query($query)) {
        $graveData["people"] = [];

        while ($row = $result->fetch_assoc()) {
            $birth_date = getPersonDate($row, true);
            $death_date = getPersonDate($row, false);

            $graveData["people"][] = [
                'full_name' => $row['full_name'],
                'birth_date' => $birth_date ?: null,
                'death_date' => $death_date ?: null
            ];
        }
    }

    $outputData = $graveData;
}
else if(isset($_GET["search_query"])){
    $searchQuery = $_GET['search_query'];
    $sql = "SELECT full_name, death_year, death_month, death_day, grave_id FROM persons WHERE full_name LIKE ?";

    if ($stmt = $conn->prepare($sql)) {
        $searchTerm = "%" . $searchQuery . "%";
        $stmt->bind_param("s", $searchTerm);

        $stmt->execute();
        $result = $stmt->get_result();
        $people = [];

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $people[] = [
                    'full_name' => $row['full_name'],
                    'death_date' => getPersonDate($row, false),
                    'grave_id' => $row['grave_id']
                ];
            }
        }

        $outputData = $people;
    }
}


$conn -> close();


echo json_encode($outputData);
?>

