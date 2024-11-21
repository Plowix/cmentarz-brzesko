<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/utils.php';

class PersonController {
    public static function searchPeople($searchQuery) {
        $conn = getDatabaseConnection();
        $sql = "SELECT full_name, death_year, death_month, death_day, grave_id 
                FROM persons 
                WHERE full_name LIKE ?";
        $people = [];

        if ($stmt = $conn->prepare($sql)) {
            $searchTerm = "%" . $searchQuery . "%";
            $stmt->bind_param("s", $searchTerm);

            $stmt->execute();
            $result = $stmt->get_result();

            while ($row = $result->fetch_assoc()) {
                $people[] = [
                    'full_name' => $row['full_name'],
                    'death_date' => getPersonDate($row, false),
                    'grave_id' => $row['grave_id']
                ];
            }
        }

        $conn->close();
        echo json_encode($people);
    }
}
?>