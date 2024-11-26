<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/utils.php';

class GraveController {
    public static function getAllGraveCoordinates() {
        $conn = getDatabaseConnection();
        $query = "SELECT id, ST_X(location) AS lat, ST_Y(location) AS lng FROM graves";
        $graves = [];

        if ($result = $conn->query($query)) {
            while ($row = $result->fetch_assoc()) {
                $graves[] = [
                    'id' => $row['id'],
                    'position' => [$row['lat'], $row['lng']]
                ];
            }
        }

        $conn->close();
        echo json_encode($graves);
    }

    public static function getGraveDetails($graveId) {
        $conn = getDatabaseConnection();
        $graveData = [
            "id" => "",
            "photo_path" => "",
            "people" => []
        ];

        // Pobierz zdjęcie grobu
        $query = "SELECT id, photo_path FROM graves WHERE id = '".$conn->real_escape_string($graveId)."'";
        if ($result = $conn->query($query)) { 
            $row =  $result->fetch_assoc();
            $graveData["id"] = $row['id'];
            $graveData["photo_path"] = $row['photo_path'];
        }

        // Pobierz osoby w grobie
        $query = "SELECT full_name, 
                     birth_year, birth_month, birth_day, 
                     death_year, death_month, death_day 
              FROM persons 
              WHERE grave_id = '".$conn->real_escape_string($graveId)."'";

        if ($result = $conn->query($query)) {
            while ($row = $result->fetch_assoc()) {
                $graveData["people"][] = [
                    'full_name' => $row['full_name'],
                    'birth_date' => getPersonDate($row, true),
                    'death_date' => getPersonDate($row, false)
                ];
            }
        }

        $conn->close();
        echo json_encode($graveData);
    }
}
?>