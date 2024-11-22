<?php
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/controllers/GraveController.php';
require_once __DIR__ . '/controllers/PersonController.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'); 
header('Access-Control-Allow-Headers: Content-Type, Authorization'); 
header('Content-Type: application/json; charset=utf-8');

// Obsługuje różne zapytania
if (isset($_GET["grave_coords"])) {
    GraveController::getAllGraveCoordinates();
} else if (isset($_GET["grave_id"])) {
    $graveID = $_GET["grave_id"];
    GraveController::getGraveDetails($graveID);
} else if (isset($_GET["search_query"])) {
    $searchQuery = $_GET["search_query"];
    $birthDay = isset($_GET["birth_day"]) ? $_GET["birth_day"] : '';
    $birthMonth = isset($_GET["birth_month"]) ? $_GET["birth_month"] : '';
    $birthYear = isset($_GET["birth_year"]) ? $_GET["birth_year"] : '';
    $deathDay = isset($_GET["death_day"]) ? $_GET["death_day"] : '';
    $deathMonth = isset($_GET["death_month"]) ? $_GET["death_month"] : '';
    $deathYear = isset($_GET["death_year"]) ? $_GET["death_year"] : '';

    PersonController::searchPeople($searchQuery, $birthDay, $birthMonth, $birthYear, $deathDay, $deathMonth, $deathYear);
} else {
    echo json_encode(['error' => 'błędna próba połączenia z php']);
}
?>