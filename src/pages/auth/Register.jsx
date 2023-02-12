import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

import Card from '../../components/card/Card';
import Spinner from '../../components/spinner/Spinner';

import RegisterImg from '../../assets/img/register.jpg';

import styles from './Auth.module.scss';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('As senhas não conferem!', {
        position: 'top-right',
      });
    } else {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          setLoading(false);
          toast.success('Conta criada com sucesso!', {
            position: 'top-right',
          });
          navigate('/login');
        })
        .catch((e) => {
          if (e.code === 'auth/invalid-email') {
            toast.error('Digite um endereço de email válido.');
          }
          if (e.code === 'auth/email-already-in-use') {
            toast.warning('Conta de email já está registrada.');
          }
          if (e.code === 'auth/weak-password') {
            toast.warning('A senha precisa ter pelo menos 6 caracteres.');
          }
          setLoading(false);
        });
    }
  };

  return (
    <section className={`container ${styles.auth}`}>
      {loading && <Spinner />}
      <div className={styles.img}>
        <img src={RegisterImg} alt='' width='400' height='auto' />
      </div>
      <Card>
        <div className={styles.form}>
          <h2>Criar conta</h2>
          <form action='' onSubmit={registerUser}>
            <input
              type='text'
              placeholder='Endereço de Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type='password'
              placeholder='Confirmar senha'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className='--btn --btn-primary --btn-block' type='submit'>
              Criar conta
            </button>
          </form>
          <span className={styles.register}>
            <p>Já possui uma conta?</p>
            <Link className={styles['account-link']} to='/login'>
              Login
            </Link>
          </span>
        </div>
      </Card>
    </section>
  );
};

export default Register;
