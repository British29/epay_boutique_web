<?php
include_once("ipconfig.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$clients = [];

$sql = "SELECT * FROM client";
if ($result = mysqli_query($mysqli, $sql)) {
    $i = 0;
    while ($row = $result->fetch_assoc()) {
        $clients[$i]['id'] = $row['id'];
        $clients[$i]['nom'] = $row['nom'];
        $clients[$i]['adresse'] = $row['adresse'];
        $clients[$i]['numero'] = $row['numero'];
        $clients[$i]['email'] = $row['email'];
        $i++;
    }
    echo json_encode($clients);
} else {
    http_response_code(404);
}
