import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';

import { selectUserId, selectEmail } from '../../redux/slices/authSlice';
import {
  selectCartItems,
  selectCartTotalAmount,
  clearAllCartItems,
} from '../../redux/slices/cartSlice';
import { selectUserShippingAddress } from '../../redux/slices/checkoutSlice';

import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { Card, CheckoutSummary } from '../index';

import spinnerGif from '../../assets/img/spinner.gif';
import { toast } from 'react-toastify';

import styles from './CheckoutForm.module.scss';

const CheckoutForm = () => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector(selectUserId);
  const userEmail = useSelector(selectEmail);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectUserShippingAddress);
  const cartTotalAmount = useSelector(selectCartTotalAmount);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret',
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const saveUserOrder = () => {
    const getDate = new Date();
    const dateString = `${getDate.getDate()}/${getDate.getMonth() + 1}/${getDate.getFullYear()}`;
    const currentTime = getDate.toLocaleTimeString();

    const orderConfig = {
      userId,
      userEmail,
      cartItems,
      orderAmount: cartTotalAmount,
      shippingAddress,
      orderDate: dateString,
      orderTime: currentTime,
      orderStatus: 'Pedido Aceito',
      uploadTime: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, 'orders'), orderConfig);
      dispatch(clearAllCartItems());
      navigate('/checkout-success');
      toast.success('Pedido disponível para consulta na página Pedidos');
    } catch (e) {
      toast.error('Erro no banco de dados. Contate o administrador da página.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000/checkout-success',
        },
        redirect: 'if_required',
      })
      .then((res) => {
        if (res.error) {
          toast.error('Erro ao confirmar o pagamento.');
          setMessage(
            'Erro ao confirmar o pagamento. Verifique o limite do cartão, bloqueios, ou entre em contato com o seu banco.',
          );
          return;
        }
        if (res.paymentIntent) {
          if (res.paymentIntent.status === 'succeeded') {
            setIsLoading(false);
            toast.success('Pagamento realizado com sucesso!');
            saveUserOrder();
          }
        }
      });

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <section>
      <div className={`container ${styles.container}`}>
        <h2>Pagamento</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
          <div>
            <Card cardClass={`${styles.card} ${styles.pay}`}>
              <h3>Pagar com o cartão</h3>
              <PaymentElement id={styles['payment-element']} options={paymentElementOptions} />
              <button
                className={styles.button}
                disabled={isLoading || !stripe || !elements}
                id='submit'>
                <span id='button-text'>
                  {isLoading ? (
                    <img style={{ width: '20px' }} src={spinnerGif} alt='carregando'></img>
                  ) : (
                    'Pagar'
                  )}
                </span>
              </button>
              {message && <div id={styles['payment-message']}>{message}</div>}
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutForm;
