import ReactDOM from 'react-dom';

import styles from './Spinner.module.scss';

import SpinnerGif from '../../assets/img/spinner.gif';

const Spinner = () => {
  return ReactDOM.createPortal(
    <div className={styles.spinner}>
      <img src={SpinnerGif} alt='' />
    </div>,
    document.querySelector('#spinner'),
  );
};

export default Spinner;
