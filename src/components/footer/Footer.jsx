import { FaGithub } from 'react-icons/fa';

import styles from './Footer.module.scss';

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <footer className={styles.footer}>
      &copy; {year} Lasso by
      <a href='https://github.com/tiagocreator' target='_blank' rel='noreferrer'>
        <FaGithub className={styles['icon']} /> tiagocreator
      </a>
    </footer>
  );
};

export default Footer;
