<?php
require_once 'config.php';
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');


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
    $query = "SELECT photo_path FROM graves WHERE id =".$_GET["grave_id"];
    if($result = $conn -> query($query)){ 
        $graveData["photo_path"] = $result->fetch_assoc()['photo_path'];
    }
    
    //pobiera dane wszystkich zmarłych w grobie
    $query = "SELECT full_name, birth_date, death_date FROM persons WHERE grave_id =".$_GET["grave_id"];
    if($result = $conn -> query($query)){
        while($row = $result->fetch_assoc()){
            $graveData["people"][] = [
                'full_name' => $row['full_name'],
                'birth_date' => $row['birth_date'],
                'death_date' => $row['death_date'],
            ];
        }
    }

    $outputData = $graveData;
}

$conn -> close();


echo json_encode($outputData);
?>

