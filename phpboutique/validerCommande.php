<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");


$host = 'localhost';
$dbname = 'eboutique';
$user = 'root';
$passwd = '';
$db = new PDO("mysql:host=localhost;dbname=" . $dbname, $user, $passwd);

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$email = trim($request->email);
$article = trim($request->article);

if (isset($postdata) && !empty($postdata)) {
    $stmt = $db->prepare('SELECT  COUNT(*) AS nb FROM commande WHERE email =?');
    $stmt->bindValue(1, $email);
    $stmt->execute();




    $to = $email;
    $subject = 'Validation de commande';
    $message = '<h1>Votre commande a bien été pris en compte</h1><p>Vous avez commander les articles suivants :<br><br><span >' . $article . ' </span></p>';
    //on definit les entetes requis;
    $headers = [];
    $headers[] = 'MIME-Version : 1.0';
    $headers[] = 'content-type: text/html; charset=iso-8859-1';
    $headers[] = 'To:' . $to . '<' . $to . '>';
    // on envoie le couriel
    mail($to, $subject, $message, implode("\r\n", $headers));
    // $message = '<div>un couriel a été envoyer</div>';    
}
