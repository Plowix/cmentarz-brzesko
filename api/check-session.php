<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'); 
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');  

session_start();
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
    echo json_encode(['user' => $_SESSION['user']]);
} else {
    echo json_encode(['user' => null]);
}

?>