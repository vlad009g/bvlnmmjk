const express = require('express');
const bodyParser = require('body-parser');
const Stripe = require('stripe');
const stripe = Stripe('YOUR_STRIPE_SECRET_KEY');

const app = express();
app.use(bodyParser.json());

app.post('/payment', async (req, res) => {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({ amount, currency: 'usd' });
    res.json({ clientSecret: paymentIntent.client_secret });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));