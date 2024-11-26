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
                    persons.grave_id, 
                    graves.photo_path 
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

        // Logowanie zapytania SQL
        error_log("SQL Query: " . $sql);
        error_log("Parameters: " . print_r($params, true));

        // Przygotowanie zapytania
        if ($stmt = $conn->prepare($sql)) {
            $types = str_repeat("s", count($params)); // Określenie typu parametrów
            $stmt->bind_param($types, ...$params);

            // Wykonanie zapytania
            if (!$stmt->execute()) {
                error_log("Błąd wykonania zapytania: " . $stmt->error);
                echo json_encode(['error' => 'Błąd wykonania zapytania']);
                return;
            }

            $result = $stmt->get_result();

            // Jeżeli wynik jest pusty, zwrócimy pustą tablicę
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
                        'photo_path' => $row['photo_path']
                    ];
                }

                // Zwracamy dane w formacie JSON
                echo json_encode($people);
            }
        } else {
            error_log("Błąd przygotowania zapytania: " . $conn->error);
            echo json_encode(['error' => 'Błąd zapytania do bazy danych']);
        }

        // Zamykanie połączenia
        $conn->close();
    }
}


?>