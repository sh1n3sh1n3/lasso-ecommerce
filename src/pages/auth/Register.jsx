import { Link } from 'react-router-dom';

import Card from '../../components/card/Card';

import RegisterImg from '../../assets/img/register.jpg';

import styles from './Auth.module.scss';

const Register = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={RegisterImg} alt='' width='400' height='auto' />
      </div>
      <Card>
        <div className={styles.form}>
          <h2>Criar conta</h2>
          <form action=''>
            <input type='text' placeholder='Endereço de Email' />
            <input type='password' placeholder='Senha' />
            <input type='password' placeholder='Confirmar senha' />
            <button className='--btn --btn-primary --btn-block'>Criar conta</button>
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
