<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - Add Product</title>
    <link rel="stylesheet" href="style.css"> <!-- Link your CSS for styling -->
</head>
<body>
    <h1>Admin Panel - Add Product</h1>

    <!-- The form you provided -->
    <form action="add-product.php" method="POST" enctype="multipart/form-data">
        <label for="category">Category:</label>
        <select name="category_id" id="category" required>
            <?php
            // PHP code to fetch and display categories from the database
            $servername = "localhost";
            $username = "root";
            $password = "root"; // Your MySQL password
            $dbname = "<Database>cozynestdb_user.sql";

            $conn = new mysqli($servername, $username, $password, $dbname);

            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            $sql = "SELECT * FROM categories";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    echo "<option value='" . $row['id'] . "'>" . $row['name'] . "</option>";
                }
            } else {
                echo "<option value=''>No categories found</option>";
            }

            $conn->close();
            ?>
        </select>

        <label for="name">Product Name:</label>
        <input type="text" name="name" id="name" required>

        <label for="description">Description:</label>
        <textarea name="description" id="description" required></textarea>

        <label for="price">Price:</label>
        <input type="text" name="price" id="price" required>

        <label for="image">Product Image:</label>
        <input type="file" name="image" id="image" required>

        <button type="submit">Add Product</button>
    </form>
</body>
</html>
