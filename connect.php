<?php
// connect.php

$servername = "localhost";
$username = "root"; // Change if necessary
$password = ""; // Add your MySQL password
$dbname = "<Database>cozynestdb_user.sql";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
