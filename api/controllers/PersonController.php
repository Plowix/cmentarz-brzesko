<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/utils.php';

class PersonController {
    public static function searchPeople($searchQuery, $birthDay, $birthMonth, $birthYear, $deathDay, $deathMonth, $deathYear) {
        $conn = getDatabaseConnection();
        
        $sql = "SELECT 
                    persons.full_name, 
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

            $stmt->execute();
            $result = $stmt->get_result();

            $people = [];
            while ($row = $result->fetch_assoc()) {
                $people[] = [
                    'full_name' => $row['full_name'],
                    'death_date' => getPersonDate($row, false),
                    'grave_id' => $row['grave_id'],
                    'photo_path' => $row['photo_path']
                ];
            }

            echo json_encode($people);
        } else {
            echo json_encode(['error' => 'Błąd zapytania do bazy danych']);
        }

        $conn->close();
    }
}
?>