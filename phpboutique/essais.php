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

// $message = '';


if (isset($postdata) && !empty($postdata)) {
	$stmt = $db->prepare('SELECT  COUNT(*) AS nb FROM marchand WHERE email =?');
	$stmt->bindValue(1, $email);
	$stmt->execute();

	$ligne = $stmt->fetch(PDO::FETCH_ASSOC);
	//on fait une requete pour savoir si l'adresse e-mail est associé à un compte
	if (!empty($ligne) && $ligne['nb'] > 0) {
		//on gère notre token 
		$string = implode('', array_merge(range('a', 'z')));
		$token = substr(str_shuffle($string), 0, 20);
		//on insère la date et le token dans la db
		$stmt = $db->prepare('UPDATE marchand SET date_demande_recuperation_pwd=NOW(), pwd_recuperation_token =? WHERE email=?');
		$stmt->bindValue(1, $token);
		$stmt->bindValue(2, $email);
		$stmt->execute();
	}

	//on prépare l'envoie du couriel
	$link = "<a href='http://localhost:5000/recup-password?token='>. $token</a>";
	$to = $email;
	$subject = 'Rénitialiser votre mot de passe';
	$message = '<h1>Rénitialisation de votre mot de passe</h1><p>Pour rénitialiser votre mot de passe , veuillez suivre ce lien: <a href="' . $link . '">' . $link . '</a><p>Il est en cours de livraison</p></p>';
	//on definit les entetes requis;
	$headers = [];
	$headers[] = 'MIME-Version : 1.0';
	$headers[] = 'content-type: text/html; charset=iso-8859-1';
	$headers[] = 'To:' . $to . '<' . $to . '>';
	// on envoie le couriel
	mail($to, $subject, $message, implode("\r\n", $headers));
	// $message = '<div>un couriel a été envoyer</div>';
}
