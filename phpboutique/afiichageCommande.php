<?php
include_once("ipconfig.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$commande = [];

$sql = "SELECT * FROM commande";
if ($result = mysqli_query($mysqli, $sql)) {
    $i = 0;
    while ($row = $result->fetch_assoc()) {
        // $commande[$i]['id'] = $row['id'];
        $commande[$i]['email'] = $row['email'];
        $commande[$i]['article'] = $row['article'];
        $i++;
    }
    echo json_encode($commande);
} else {
    http_response_code(404);
}
