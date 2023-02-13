import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/config';

import Card from '../../components/card/Card';
import Spinner from '../../components/spinner/Spinner';

import ResetImg from '../../assets/img/reset-password.jpg';

import styles from './Auth.module.scss';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();

    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        toast.success('Link enviado. Verifique seu endereço de email.');
      })
      .catch((e) => {
        if (e.code === 'auth/missing-email') {
          toast.error('Digite um endereço de email.');
        }
        if (e.code === 'auth/invalid-email') {
          toast.error('Endereço de email inválido.');
        }
        if (e.code === 'auth/user-not-found') {
          toast.error('Endereço de email não cadastrado!');
        }
        setLoading(false);
      });
  };

  return (
    <section className={`container ${styles.auth}`}>
      {loading && <Spinner />}
      <div className={styles.img}>
        <img src={ResetImg} alt='' width='400' height='auto' />
      </div>
      <Card>
        <div className={styles.form}>
          <h2>Esqueceu a senha?</h2>
          <p>Digite o endereço de Email da sua conta e receba um link para criar uma nova senha.</p>
          <form action='' onSubmit={resetPassword}>
            <input
              type='text'
              placeholder='Endereço de Email'
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <button className='--btn --btn-primary --btn-block' type='submit'>
              Receber link
            </button>
            <div className={styles.links}>
              <p>
                <Link to='/login'>Fazer login</Link>
              </p>
              <p>
                <Link to='/register'>Criar conta</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default Reset;
