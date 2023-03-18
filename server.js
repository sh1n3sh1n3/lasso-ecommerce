require('dotenv').config();
const cors = require('cors');
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

const express = require('express');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Mensagem Teste');
});

const orderAmountArray = [];
const calculateOrderAmount = (items) => {
  items.cartItems.map((item) => {
    const { price, cartTotalQuantity } = item;
    const cartProductsAmont = price * cartTotalQuantity;
    return orderAmountArray.push(cartProductsAmont);
  });
  const totalProductsPriceAmount = orderAmountArray.reduce((a, b) => {
    return a + b;
  }, 0);
  return totalProductsPriceAmount * 100;
};

app.post('/create-payment-intent', async (req, res) => {
  const { items, userShippingAddress, paymentDescription } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'brl',
    automatic_payment_methods: {
      enabled: true,
    },
    paymentDescription,
    userShippingAddress: {
      address: {
        lineOne: userShippingAddress.lineOne,
        lineTwo: userShippingAddress.lineTwo,
        city: userShippingAddress.city,
        country: userShippingAddress.country,
        portalCode: userShippingAddress.portalCode,
      },
      name: userShippingAddress.name,
      phone: userShippingAddress.phone,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

const port = process.env.REACT_APP_DEFAULT_SERVER_PORT || 5000;
app.listen(port, () => console.log(`Servidor node funcionando na porta ${port}!`));
