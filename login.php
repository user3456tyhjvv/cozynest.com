<?php
// login.php

session_start();

$servername = "localhost";
$username = "root";
$password = ""; // Replace with your actual MySQL password
$dbname = "<Database>cozynestdb_user.sql";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            // Password is correct
            $_SESSION['username'] = $row['username'];
            $_SESSION['email'] = $row['email'];

            // Redirect to homepage
            header("Location: ../index.html");
            exit();
        } else {
            echo "Invalid email or password";
        }
    } else {
        echo "No account found with that email";
    }
}

$conn->close();
?>
