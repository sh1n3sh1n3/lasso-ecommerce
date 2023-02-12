import { Link } from 'react-router-dom';

import Card from '../../components/card/Card';

import { FaGoogle } from 'react-icons/fa';

import LoginImg from '../../assets/img/login.jpg';

import styles from './Auth.module.scss';

const Login = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>Login</h2>
          <form action=''>
            <input type='text' placeholder='Endereço de Email' autoFocus />
            <input type='password' placeholder='Senha' />
            <button className='--btn --btn-primary --btn-block'>Login</button>
            <div className={styles.links}>
              <Link to='/reset-password'>Esqueceu a senha?</Link>
            </div>
            <p>-- ou --</p>
          </form>
          <button className='--btn --btn-danger --btn-block'>
            <FaGoogle className={styles.icon} size={15} />
            Entrar com o Gmail
          </button>
          <span className={styles.register}>
            <p>Não tem uma conta?</p>
            <Link className={styles['account-link']} to='/register'>
              Criar conta
            </Link>
          </span>
        </div>
      </Card>
      <div className={styles.img}>
        <img src={LoginImg} alt='' width='400' height='auto' />
      </div>
    </section>
  );
};

export default Login;
