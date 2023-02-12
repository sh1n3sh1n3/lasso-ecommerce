import { Link } from 'react-router-dom';

import Card from '../../components/card/Card';

import ResetImg from '../../assets/img/reset-password.jpg';

import styles from './Auth.module.scss';

const Reset = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={ResetImg} alt='' width='400' height='auto' />
      </div>
      <Card>
        <div className={styles.form}>
          <h2>Esqueceu a senha?</h2>
          <p>Digite o endereço de Email da sua conta e receba um link para criar uma nova senha.</p>
          <form action=''>
            <input type='text' placeholder='Endereço de Email' autoFocus />
            <button className='--btn --btn-primary --btn-block'>Receber link</button>
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
