<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout</title>
    <link rel="stylesheet" href="style.css">
    <style>
        /* Add your CSS styles here */
        .overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .popup {
            background: white;
            padding: 20px;
            border-radius: 10px;
            width: 300px;
            text-align: center;
        }
        .close-btn {
            cursor: pointer;
            color: red;
            font-size: 20px;
            position: absolute;
            top: 10px;
            right: 10px;
        }
    </style>
</head>
<body>
    <h1>Checkout</h1>
    <button id="checkout-btn">Proceed to Checkout</button>

    <!-- Payment Popup -->
    <div class="overlay" id="payment-popup">
        <div class="popup">
            <span class="close-btn" id="close-btn">&times;</span>
            <h2>Choose Payment Method</h2>
            <button id="paypal-btn">Pay with PayPal</button>
            <button id="mpesa-btn">Pay with MPesa</button>
        </div>
    </div>

    <script>
        document.getElementById('checkout-btn').addEventListener('click', function() {
            document.getElementById('payment-popup').style.display = 'flex';
        });

        document.getElementById('close-btn').addEventListener('click', function() {
            document.getElementById('payment-popup').style.display = 'none';
        });

        document.getElementById('paypal-btn').addEventListener('click', function() {
            window.location.href = 'https://www.paypal.com'; // Redirect to PayPal payment page
        });

        document.getElementById('mpesa-btn').addEventListener('click', function() {
            window.location.href = 'mpesa-payment.html'; // Redirect to MPesa payment page
        });
    </script>
</body>
</html>
