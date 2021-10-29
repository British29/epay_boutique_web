<?php
require 'ipconfig.php';

var_dump($_GET);

$id  = $_GET["id"];

$sql = "DELETE FROM articles WHERE id = '" . $id . "'";

$result = $mysqli->query($sql);

echo json_encode([$id]);
