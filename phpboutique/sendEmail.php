<?php

include_once("ipconfig.php");



$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
var_dump($postdata);

if (isset($postdata) && !empty($postdata)) {
    $receiver = trim($request->email);

    $subject = "Renitialiser votre mot de passe";
    $body = "Pour reniatiliser votre mot de passe cliquer sur le lien \n\n <a href='http://localhost:5000/recup-password'>Renitialiser le mot de passe</a>";

    $sender = "noreply@gmail.com";

    if (mail($receiver, $subject, $body, $sender)) {
        echo "Email envoyer";
    } else {
        echo "Desolé , le mail n'a pu etre envoyer!";
    }
}
