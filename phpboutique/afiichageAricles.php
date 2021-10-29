<?php
include_once("ipconfig.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$article = [];

$sql = "SELECT * FROM articles";
if ($result = mysqli_query($mysqli, $sql)) {
	$i = 0;
	while ($row = $result->fetch_assoc()) {
		$article[$i]['id'] = $row['id'];
		$article[$i]['designation'] = $row['designation'];
		$article[$i]['categories'] = $row['categories'];
		$article[$i]['quantite'] = $row['quantite'];
		$article[$i]['prix'] = $row['prix'];
		$article[$i]['photo'] = $row['photo'];
		$article[$i]['date'] = $row['date'];
		$i++;
	}
	echo json_encode($article);
} else {
	http_response_code(404);
}
