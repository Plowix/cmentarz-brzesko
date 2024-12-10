<?php
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/controllers/GraveController.php';
require_once __DIR__ . '/controllers/PersonController.php';

$environment = getenv('APP_ENV') ?: 'local'; 

header('Content-Type: application/json; charset=utf-8');
if ($environment === 'production') {
    header('Access-Control-Allow-Origin: https://pszczypula.cba.com');
} else {
    header('Access-Control-Allow-Origin: http://localhost:3000');
}
header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true'); 

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
}else if(isset($_GET['delete_grave_id'])){
    if (!isset($_SESSION['user'])) {
        echo json_encode(['error' => 'Brak uprawnień']);
        exit;
    }
    $graveId = $_GET['delete_grave_id'];
    GraveController::deleteGrave($graveId);
} 
else {
    echo json_encode(['error' => 'Błędna próba połączenia z PHP'.$_SERVER['REQUEST_METHOD']]);
    error_log('Invalid request: ' . json_encode($_GET)); 
}
?>
