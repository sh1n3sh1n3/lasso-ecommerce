import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import {
  calculateProductsSubtotal,
  calculateProductsTotalQuantity,
  selectCartItems,
  selectCartTotalAmount,
} from '../../redux/slices/cartSlice';
import { selectEmail } from '../../redux/slices/authSlice';
import {
  selectUserBillingAddress,
  selectUserShippingAddress,
} from '../../redux/slices/checkoutSlice';

import { CheckoutForm } from '../../components';

import { toast } from 'react-toastify';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState('');
  const [message, setMessage] = useState('Iniciando processo de pagamento. Aguarde....');
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const userEmail = useSelector(selectEmail);
  const userShippingAddress = useSelector(selectUserShippingAddress);
  const userBillingAddress = useSelector(selectUserBillingAddress);

  useEffect(() => {
    dispatch(calculateProductsSubtotal());
    dispatch(calculateProductsTotalQuantity());
  }, [dispatch, cartItems]);

  const paymentDescription = `Pagamento de ${userEmail} para Lasso, valor total do(s) produto(s) de: R$:${cartTotalAmount.toFixed(
    2,
  )}.`;

  useEffect(() => {
    const paymentIntentLink = process.env.REACT_APP_PAYMENT_INTENT_LINK
      ? process.env.REACT_APP_PAYMENT_INTENT_LINK
      : 'http://localhost:4242/create-payment-intent';

    fetch(paymentIntentLink, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cartItems,
        userEmail: userEmail,
        shipping: userShippingAddress,
        billing: userBillingAddress,
        description: paymentDescription,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((e) => {
        setMessage('Falha ao inicializar o processo de pagamento. Tente novamente mais tarde.');
        toast.error('Erro. Entre em contato com o administrador da página.');
      });
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <section>
        <div className='container'>{!clientSecret && <h3>{message}</h3>}</div>
      </section>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Checkout;
