<?php
require 'ipconfig.php';
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$id  = $_GET["id"];

$sql = "DELETE FROM commande WHERE id = '" . $id . "'";

$result = $mysqli->query($sql);

echo json_encode([$id]);
