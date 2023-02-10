import { Link } from 'react-router-dom';

import { FaGoogle } from 'react-icons/fa';

import LoginImg from '../../assets/img/login.jpg';

import styles from './Auth.module.scss';

const Login = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.form}>
        <h2>Login</h2>
        <form action=''>
          <input type='text' placeholder='Endereço de Email' />
          <input type='password' placeholder='Senha' />
          <button className='--btn --btn-primary --btn-block'>Login</button>
          <div className={styles.links}>
            <Link to='/reset'>Esqueceu a senha?</Link>
          </div>
          <p>-- ou --</p>
        </form>
        <button className='--btn --btn-danger --btn-block'>
          <FaGoogle className={styles.icon} size={15} />
          Entrar com o Gmail
        </button>
        <span className={styles.register}>
          <p>Não tem uma conta?</p>
          <Link to='/register'>Criar conta</Link>
        </span>
      </div>
      <div className={styles.img}>
        <img src={LoginImg} alt='' width='400' height='auto' />
      </div>
    </section>
  );
};

export default Login;
