const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Update this if different
    password: 'root', // Update with your DB password
    database: 'cozynestdb'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE UserEmail = ?';
    db.query(query, [email], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            const user = results[0];

            // Check if the password matches
            bcrypt.compare(password, user.UserPassword, (err, isMatch) => {
                if (isMatch) {
                    // Login successful
                    res.json({ success: true });
                } else {
                    // Incorrect password
                    res.json({ success: false, error: 'incorrect_password' });
                }
            });
        } else {
            // No account found for this email
            res.json({ success: false, error: 'no_account' });
        }
    });
});

// Signup route
app.post('/signup', async (req, res) => {
    const { username, email, password, phone } = req.body;

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (UserName, UserEmail, UserPassword, UserPhoneNumber) VALUES (?, ?, ?, ?)';
    db.query(query, [username, email, hashedPassword, phone], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            res.status(500).send('Error registering user');
        } else {
            res.json({ success: true });
        }
    });
});

// Start the server
 PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





// Middleware to check if user is logged in
function isAuthenticated(req, res, next) {
    // Check authentication status (e.g., from session or token)
    if (req.cookies.loggedIn === 'true') {
        next(); // User is logged in
    } else {
        res.redirect('sign-up/signup.html'); // Redirect to sign-up page
    }
}

// Payment page route
app.get('/payment', isAuthenticated, (req, res) => {
    res.sendFile(__dirname + '/paymentpage.html'); // Serve the payment form
});

// Sign-up page route
app.get('/sign-up', (req, res) => {
    res.sendFile(__dirname + 'sign-up/signup.html'); // Serve the sign-up form
});

// Start the server
PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const request = require('request');
 app = express();
app.use(express.urlencoded({ extended: true }));

app.post('/process_payment', (req, res) => {
    const { payment_method, mpesa_number, paypal_email, amount } = req.body;

    if (payment_method === 'mpesa') {
        // Use Safaricom's Daraja API to process M-Pesa payment
        const options = {
            method: 'POST',
            url: 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
            headers: {
                Authorization: 'Bearer <ACCESS_TOKEN>',
            },
            json: {
                BusinessShortCode: '<YOUR_SHORTCODE>',
                Password: '<GENERATED_PASSWORD>',
                Timestamp: '<CURRENT_TIMESTAMP>',
                TransactionType: 'CustomerPayBillOnline',
                Amount: amount,
                PartyA: mpesa_number,
                PartyB: '<YOUR_SHORTCODE>',
                PhoneNumber: mpesa_number,
                CallBackURL: '<YOUR_CALLBACK_URL>',
                AccountReference: 'Cozynest',
                TransactionDesc: 'Payment for order',
            },
        };

        request(options, (error, response, body) => {
            if (error) {
                console.error('Error processing M-Pesa payment:', error);
                res.status(500).send('Error processing M-Pesa payment');
                return;
            }
            res.send('M-Pesa payment processed successfully');
        });
    } else if (payment_method === 'paypal') {
        // Handle PayPal payment processing here
        res.send('PayPal payment option selected');
    } else {
        res.status(400).send('Invalid payment method selected');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
