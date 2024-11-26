<?php
session_start();
require_once 'config/database.php';

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input")); 

    if ($data === null) {
        echo json_encode(['error' => 'Nieprawidłowe dane wejściowe']);
        exit;
    }

    $username = $data->username ?? '';
    $password = $data->password ?? '';

    if ($username === '' || $password === '') {
        echo json_encode(['error' => 'Brak wymaganych danych']);
        exit;
    }

    $conn = getDatabaseConnection();

    $stmt = $conn->prepare('SELECT id, username, password, role FROM users WHERE username = ?');
    $stmt->bind_param('s', $username); 

    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user'] = [
            'id' => $user['id'],
            'username' => $user['username'],
            'role' => $user['role'],
        ];

        echo json_encode(['user' => $user]);
    } else {
        echo json_encode(['error' => 'Błędna nazwa użytkownika lub hasło']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['error' => 'Nieprawidłowa metoda żądania']);
}
?>
