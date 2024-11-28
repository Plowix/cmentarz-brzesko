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

        $query = "SELECT id FROM graves WHERE id = '".$conn->real_escape_string($graveId)."'";
        if ($result = $conn->query($query)) { 
            $row =  $result->fetch_assoc();
            $graveData["id"] = $row['id'];
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

public static function addGrave() {
    $conn = getDatabaseConnection();

    $graveId = $_POST['graveId'];
    $xCoord = $_POST['xCoord'];
    $yCoord = $_POST['yCoord'];
    
    $photoPath = null;
    if (isset($_FILES['image'])) {
        $targetDir = $_SERVER['DOCUMENT_ROOT'] . "/images/graves/";

        $fileExtension = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));

        $targetFile = $targetDir . str_replace('/', '_', $_POST['graveId']) . ".jpg";

        if (file_exists($targetFile)) {
            echo json_encode(['error' => 'Plik już istnieje']);
            exit;
        }

        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
            $photoPath = $targetFile;
        } else {
            echo json_encode(['error' => 'Wystąpił problem przy zapisywaniu pliku']);
            exit;
        }
    } else {
        echo json_encode(['error' => 'Brak pliku do załadowania']);
        exit;
    }

    $location = "POINT($xCoord $yCoord)";

    $query = "INSERT INTO graves (id, location) 
              VALUES (?, ST_GeomFromText(?, 4326))";
    
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("ss", $graveId, $location);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => 'Grób został pomyślnie dodany']);
        } else {
            echo json_encode(['error' => 'Błąd dodawania grobu']);
        }
    } else {
        echo json_encode(['error' => 'Błąd przygotowania zapytania']);
    }

    $conn->close();
}

}
?>