<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/utils.php';

class PersonController {
    public static function searchPeople($searchQuery, $birthDay, $birthMonth, $birthYear, $deathDay, $deathMonth, $deathYear) {
        $conn = getDatabaseConnection();

        // Sprawdzamy połączenie z bazą
        if ($conn->connect_error) {
            error_log("Błąd połączenia z bazą danych: " . $conn->connect_error);
            echo json_encode(['error' => 'Błąd połączenia z bazą danych']);
            return;
        }

        $sql = "SELECT 
                    persons.full_name, 
                    persons.birth_year, 
                    persons.birth_month, 
                    persons.birth_day, 
                    persons.death_year, 
                    persons.death_month, 
                    persons.death_day, 
                    persons.grave_id
                FROM 
                    persons 
                LEFT JOIN 
                    graves 
                ON 
                    persons.grave_id = graves.id
                WHERE 
                    persons.full_name LIKE ?";

        $params = ["%$searchQuery%"];

        // Dodawanie filtrów daty
        if ($birthDay !== '') {
            $sql .= " AND persons.birth_day = ?";
            $params[] = $birthDay;
        }
        if ($birthMonth !== '') {
            $sql .= " AND persons.birth_month = ?";
            $params[] = $birthMonth;
        }
        if ($birthYear !== '') {
            $sql .= " AND persons.birth_year = ?";
            $params[] = $birthYear;
        }

        if ($deathDay !== '') {
            $sql .= " AND persons.death_day = ?";
            $params[] = $deathDay;
        }
        if ($deathMonth !== '') {
            $sql .= " AND persons.death_month = ?";
            $params[] = $deathMonth;
        }
        if ($deathYear !== '') {
            $sql .= " AND persons.death_year = ?";
            $params[] = $deathYear;
        }


        if ($stmt = $conn->prepare($sql)) {
            $types = str_repeat("s", count($params));
            $stmt->bind_param($types, ...$params);

            // Wykonanie zapytania
            if (!$stmt->execute()) {
                error_log("Błąd wykonania zapytania: " . $stmt->error);
                echo json_encode(['error' => 'Błąd wykonania zapytania']);
                return;
            }

            $result = $stmt->get_result();

            if ($result->num_rows === 0) {
                echo json_encode([]);
            } else {
                // Zbieramy dane
                $people = [];
                while ($row = $result->fetch_assoc()) {
                    $people[] = [
                        'full_name' => $row['full_name'],
                        'birth_date' => getPersonDate($row, true),
                        'death_date' => getPersonDate($row, false),
                        'grave_id' => $row['grave_id'],
                    ];
                }

                echo json_encode($people);
            }
        } else {
            error_log("Błąd przygotowania zapytania: " . $conn->error);
            echo json_encode(['error' => 'Błąd zapytania do bazy danych']);
        }

        $conn->close();
    }

    public static function addPerson() {
        $conn = getDatabaseConnection();

        $graveId = $_POST['graveId'];
        $fullName = $_POST['fullName'];
        $birthYear = $_POST['birthYear'];
        $birthMonth = $_POST['birthMonth'];
        $birthDay = $_POST['birthDay'];
        $deathYear = $_POST['deathYear'];
        $deathMonth = $_POST['deathMonth'];
        $deathDay = $_POST['deathDay'];

        $query = "INSERT INTO persons 
                (grave_id, full_name, birth_year, birth_month, birth_day, death_year, death_month, death_day) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        if ($stmt = $conn->prepare($query)) {
            $stmt->bind_param("ssssssss", $graveId, $fullName, $birthYear, $birthMonth, $birthDay, $deathYear, $deathMonth, $deathDay);
            
            if ($stmt->execute()) {
                echo json_encode(['success' => 'Osoba została pomyślnie dodana']);
            } else {
                echo json_encode(['error' => 'Błąd dodawania osoby']);
            }
        } else {
            echo json_encode(['error' => 'Błąd przygotowania zapytania']);
        }

        $conn->close();
    }

}


?>