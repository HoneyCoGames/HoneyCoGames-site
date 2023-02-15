<?php

    $name = $_POST['name-contact'];
    $email = $_POST['email-contact'];
    $message = $_POST['text-message'];

    $toEmail = 'example@example.com';
    $emailSubject = 'New email from your contact form';
    $headers = ['From' => $email, 'Reply-To' => $email, 'Content-type' => 'text/html; charset=utf-8'];
    $bodyParagraphs = ["Name: {$name}", "Email: {$email}", "Message:", $message];
    $body = join(PHP_EOL, $bodyParagraphs);

    mail($toEmail, $emailSubject, $body, $headers);
    header('Location: ../about/');
?>