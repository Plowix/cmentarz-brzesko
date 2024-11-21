<?php
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/controllers/GraveController.php';
require_once __DIR__ . '/controllers/PersonController.php';

header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'); 
header('Access-Control-Allow-Headers: Content-Type, Authorization'); header('Content-Type: application/json; charset=utf-8');

if (isset($_GET["grave_coords"])) GraveController::getAllGraveCoordinates();
else if(isset($_GET["grave_id"])){
    $graveID = $_GET["grave_id"];
    GraveController::getGraveDetails($graveID);
}
else if(isset($_GET["search_query"])){
    $searchQuery = $_GET["search_query"];
    PersonController::searchPeople($searchQuery);
}
else{
    echo json_encode(['error'=>'błędna próba połączenia z php']);
}
?>