<?php
$servername = "localhost";
$username = "root";
$password = "root"; // Your MySQL password
$dbname = "cozynestdb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Hash the password
    $phone = $_POST['phone'];

    $sql = "INSERT INTO users (username, email, password, phone) VALUES ('$username', '$email', '$password', '$phone')";

    if ($conn->query($sql) === TRUE) {
        // Redirect to homepage after successful registration
        header("Location: homepage.html"); // Replace "index.php" with your homepage file
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
