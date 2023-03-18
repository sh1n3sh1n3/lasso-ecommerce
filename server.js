require('dotenv').config();
const cors = require('cors');
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

const express = require('express');

const app = express();
app.use(cors());
app.use(express.json());

const orderAmountArray = [];
const calculateOrderAmount = (items) => {
  items.map((item) => {
    const { price, cartTotalQuantity } = item;
    const cartTotalProductsAmount = parseInt(price * cartTotalQuantity);
    return orderAmountArray.push(cartTotalProductsAmount);
  });
  const totalProductsPriceAmount = orderAmountArray.reduce((a, b) => {
    return a + b;
  }, 0);
  return totalProductsPriceAmount * 100;
};

app.post('/create-payment-intent', async (req, res) => {
  const { items, shipping, description } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'brl',
    automatic_payment_methods: {
      enabled: true,
    },
    description,
    shipping: {
      address: {
        line1: shipping.lineOne,
        line2: shipping.lineTwo,
        city: shipping.city,
        country: shipping.country,
        postal_code: shipping.portalCode,
      },
      name: shipping.name,
      phone: shipping.phone,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

const port = process.env.REACT_APP_DEFAULT_SERVER_PORT || 4242;
app.listen(port, () => console.log(`Servidor node funcionando na porta ${port}!`));
