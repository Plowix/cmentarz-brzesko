<?php
require_once 'config.php';

function getDatabaseConnection(){
    global $server, $username, $password, $database;

    $conn = new mysqli($server, $username, $password, $database);
    if($conn->connect_errno){
        die(json_encode(['error' => "Nie udało się połączyć z bazą danych"]));
    }

    return $conn;
}
?>