import { useRef } from 'react';
import emailjs from '@emailjs/browser';

import styles from './Contact.module.scss';

import { Card } from '../../components/index';
import { FaEnvelope, FaPhoneAlt, FaTwitter } from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';
import { toast } from 'react-toastify';

const Contact = () => {
  const form = useRef();

  const submitContactForm = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          toast.success('Mensagem enviada com sucesso!');
        },
        (e) => {
          console.log('Erro ao entrar em contato. Tente novamente mais tarde.');
        },
      );
    e.target.reset();
  };

  return (
    <section>
      <div className={`container ${styles.container}`}>
        <h2>Entre em Contato</h2>
        <div className={styles.section}>
          <form ref={form} onSubmit={(e) => submitContactForm(e)}>
            <Card cardClass={styles.card}>
              <label>Nome Completo:</label>
              <input type='text' name='contact-user-name' placeholder='Nome Completo' required />
              <label>Email:</label>
              <input
                type='email'
                name='contact-user-email'
                placeholder='Seu Melhor Email'
                required
              />
              <label>Motivo do Contato:</label>
              <input type='text' name='contact-subject' placeholder='Motivo do Contato' required />
              <label>Mensagem:</label>
              <textarea
                name='contact-message'
                cols='30'
                rows='10'
                placeholder='Mensagem'
                required></textarea>
              <button className='--btn --btn-primary'>Entrar em Contato</button>
            </Card>
          </form>
          <div className={styles.details}>
            <Card cardClass={styles.detailsCard}>
              <h3>Informações de Contato e Endereço</h3>
              <p>Além do formulário, você também pode entrar em contato pelos seguintes meios:</p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt />
                  <p>+55 12 3456789</p>
                </span>
                <span>
                  <FaEnvelope />
                  <p>contato@lasso.com</p>
                </span>
                <span>
                  <GoLocation />
                  <p>Maceió, AL</p>
                </span>
                <span>
                  <FaTwitter />
                  <p>@lasso</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
