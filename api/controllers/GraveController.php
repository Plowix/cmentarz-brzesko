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

        $query = "SELECT id, ST_X(location) AS lat, ST_Y(location) AS lng FROM graves WHERE id = '".$conn->real_escape_string($graveId)."'";
        if ($result = $conn->query($query)) { 
            $row =  $result->fetch_assoc();
            $graveData["id"] = $row['id'];
            $graveData["location"] = [$row['lat'], $row['lng']];
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

        $deletePersonsQuery = "DELETE FROM persons WHERE grave_id = ?";
        if ($deleteStmt = $conn->prepare($deletePersonsQuery)) {
            $deleteStmt->bind_param("s", $graveId);
            if ($deleteStmt->execute()) {
                error_log("Usunięte");
            }
            $deleteStmt->close();
        } else {
            echo json_encode(['error' => 'Błąd przygotowania zapytania DELETE']);
        }
        
        $photoPath = null;
        if (isset($_FILES['image'])) {
            $targetDir = $_SERVER['DOCUMENT_ROOT'] . "/images/graves/";

            if (!file_exists($targetDir)) {
                mkdir($targetDir, 0777, true);  
            }

            $fileExtension = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
            $targetFile = $targetDir . str_replace('/', '_', $_POST['graveId']) . ".jpg";

            if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
                $photoPath = $targetFile;
                echo json_encode(['success' => 'Plik został zapisany']);
            } else {
                echo json_encode(['error' => 'Wystąpił problem przy zapisywaniu pliku']);
            }
        } else {
            echo json_encode(['error' => 'Brak pliku do załadowania']);
        }
    
        $location = "POINT($xCoord $yCoord)";
    
        $checkQuery = "SELECT id FROM graves WHERE id = ?";
        if ($stmt = $conn->prepare($checkQuery)) {
            $stmt->bind_param("s", $graveId);
            $stmt->execute();
            $stmt->store_result();
    
            if ($stmt->num_rows > 0) {
                $updateQuery = "UPDATE graves SET location = ST_GeomFromText(?, 4326) WHERE id = ?";
                if ($updateStmt = $conn->prepare($updateQuery)) {
                    $updateStmt->bind_param("ss", $location, $graveId);
                    
                    if ($updateStmt->execute()) {
                        echo json_encode(['success' => 'Dane grobu zostały zaktualizowane']);
                    } else {
                        echo json_encode(['error' => 'Błąd aktualizacji grobu']);
                    }
                } else {
                    echo json_encode(['error' => 'Błąd przygotowania zapytania UPDATE']);
                }
            } else {
                $insertQuery = "INSERT INTO graves (id, location) VALUES (?, ST_GeomFromText(?, 4326))";
                if ($insertStmt = $conn->prepare($insertQuery)) {
                    $insertStmt->bind_param("ss", $graveId, $location);
                    
                    if ($insertStmt->execute()) {
                        echo json_encode(['success' => 'Grób został pomyślnie dodany']);
                    } else {
                        echo json_encode(['error' => 'Błąd dodawania grobu']);
                    }
                } else {
                    echo json_encode(['error' => 'Błąd przygotowania zapytania INSERT']);
                }
            }
    
            $stmt->close();
        } else {
            echo json_encode(['error' => 'Błąd przygotowania zapytania SELECT']);
        }
    
        $conn->close();
    }
    

    public static function deleteGrave($graveId) {
        $conn = getDatabaseConnection();

        $query = "DELETE FROM persons WHERE grave_id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $graveId);

        $stmt->execute();

        $query = "DELETE FROM graves WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $graveId);

        $stmt->execute();

        $stmt->close();
        $conn->close();
    }
}
?>