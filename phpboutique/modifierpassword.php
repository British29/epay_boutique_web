<?php
include_once("ipconfig.php");

$postdata = file_get_contents('php://input');
$postdata = json_decode($postdata);

// var_dump($postdata);



$sql = "UPDATE marchand SET password = '" . $postdata->password . "' ";
$result = $mysqli->query($sql);

$sql = "SELECT * FROM marchand ";
$result = $mysqli->query($sql);
$data = $result->fetch_assoc();



echo json_encode($data);
