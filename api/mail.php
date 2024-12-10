<?php
require_once 'mail-config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);
    
    $to = $contact_mail;
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["status" => "success", "message" => "Wiadomość wysłana pomyślnie!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Wystąpił problem podczas wysyłania wiadomości."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Metoda żądania nie jest obsługiwana."]);
}
?>
