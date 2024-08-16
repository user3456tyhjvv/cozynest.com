<?php
// Mock data for demonstration (replace with actual session or database data)
$user = [
    'name' => 'John Doe',
    'email' => 'johndoe@example.com',
    'password' => 'password123' // In real applications, passwords should never be stored or displayed in plain text
];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .account-container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 300px;
            text-align: center;
        }

        .account-container h2 {
            margin-bottom: 20px;
            color: #333;
        }

        .account-container p {
            margin: 10px 0;
            color: #666;
        }

        .account-container .info {
            font-weight: bold;
            color: #333;
        }

        .btn {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            color: #fff;
            background-color: #007BFF;
            text-decoration: none;
            border-radius: 5px;
        }

        .btn:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="account-container">
        <h2>Your Account</h2>
        <p><strong>Name:</strong> <span class="info"><?php echo $user['name']; ?></span></p>
        <p><strong>Email:</strong> <span class="info"><?php echo $user['email']; ?></span></p>
        <p><strong>Password:</strong> <span class="info"><?php echo $user['password']; ?></span></p>
        <button type="submit">Update</button>
        <a href="homepage.html" class="btn">Back to Homepage</a>
    </div>
</body>
</html>
