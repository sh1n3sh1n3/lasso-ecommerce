import { Link } from 'react-router-dom';

import styles from './Error404.module.scss';

const Error404 = () => {
  return (
    <div className={styles.container}>
      <div>
        <h2>Erro 404: Página não encontrada.</h2>
        <p>
          Não conseguimos encontrar a página que você procura, use as opções no menu ou retorne para
          a página inicial.
        </p>
        <Link to='/'>
          <button className='--btn --btn-primary'>Página Inicial</button>
        </Link>
      </div>
    </div>
  );
};

export default Error404;
