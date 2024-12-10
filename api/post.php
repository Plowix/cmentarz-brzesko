<?php
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/controllers/GraveController.php';
require_once __DIR__ . '/controllers/PersonController.php';

$environment = getenv('APP_ENV') ?: 'local'; 

if ($environment === 'production') {
    header('Access-Control-Allow-Origin: https://pszczypula.cba.com');
} else {
    header('Access-Control-Allow-Origin: http://localhost:3000');
}
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true'); 

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_SESSION['user'])) {
        echo json_encode(['error' => 'Brak uprawnień']);
        exit;
    }
    if (isset($_POST['graveId']) && !isset($_POST['fullName'])) {
        GraveController::addGrave();
    }

    if (isset($_POST['graveId']) && isset($_POST['fullName'])) {
        PersonController::addPerson();
    }
}
else {
    echo json_encode(['error' => 'Błędna próba połączenia z PHP'.$_SERVER['REQUEST_METHOD']]);
    error_log('Invalid request: ' . json_encode($_GET)); 
}