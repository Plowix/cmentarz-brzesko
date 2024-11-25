<?php
$environment = getenv('APP_ENV') ?: 'local'; 

if ($environment === 'production') {
    header('Access-Control-Allow-Origin: https://pszczypula.cba.com');
} else {
    header('Access-Control-Allow-Origin: http://localhost:3000');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

session_start();
require_once 'config/database.php';

if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'admin') {
    echo json_encode(['error' => 'Brak uprawnień']);
    exit;
}

$conn = getDatabaseConnection();

$query = "SELECT id, username, role FROM users";
$result = $conn->query($query);

$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode(['users' => $users]);


?>
