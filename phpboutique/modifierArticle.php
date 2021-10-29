<?php
include_once("ipconfig.php");


$postdata = file_get_contents('php://input');
$postdata = json_decode($postdata);

var_dump($postdata);
var_dump($_FILES);

$id  = $_GET["id"];


$sql = "UPDATE articles SET designation = '" . $postdata->designation . "', categories = '" . $postdata->categories . "', quantite = '" . $postdata->quantite . "', prix = '" . $postdata->prix . "' WHERE id = '" . $id . "'";
$result = $mysqli->query($sql);

$sql = "SELECT * FROM articles WHERE id = '" . $id . "'";
$result = $mysqli->query($sql);
$data = $result->fetch_assoc();

echo json_encode($data);
