const express = require('express');
const request = require('request');
const app = express();
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
