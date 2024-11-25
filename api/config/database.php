<?php
require_once 'config.php';

function getDatabaseConnection(){
    global $db_server, $db_username, $db_password, $db_database;

    $conn = new mysqli($db_server, $db_username, $db_password, $db_database);
    if($conn->connect_errno){
        die(json_encode(['error' => "Nie udało się połączyć z bazą danych"]));
    }

    return $conn;
}
?>