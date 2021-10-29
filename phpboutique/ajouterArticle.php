<?php

include_once("ipconfig.php");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

if (isset($_POST) && !empty($_FILES)) {
    $designation = $_POST['designation'];
    $categories = $_POST['categories'];
    $quantite = $_POST['quantite'];
    $prix = $_POST['prix'];
    $image = $_FILES['file']['name'];

    $imagePath = 'uploads/' . $image;
    $tmp_name = $_FILES['file']['tmp_name'];
    move_uploaded_file($tmp_name, $imagePath);
    $sql = "INSERT INTO articles(designation ,categories ,quantite ,prix,photo) VALUES ('$designation','$categories','$quantite','$prix','$image')";
    if ($mysqli->query($sql) === TRUE) {
        $authdata = [
            'designation' => $designation,
            'categories' => $categories,
            'quantite' => $quantite,
            'prix' => $prix,
            'photo' => $image,
            'Id' => mysqli_insert_id($mysqli)
        ];
        echo json_encode($authdata);
    }
}
