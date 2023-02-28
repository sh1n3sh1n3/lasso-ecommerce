import { useSelector } from 'react-redux';
import { selectEmail } from '../../redux/slices/authSlice';

import { AiOutlineArrowLeft } from 'react-icons/ai';
import { CgDanger } from 'react-icons/cg';
import { Link } from 'react-router-dom';

export const UseAdminRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === process.env.REACT_APP_ADMIN_EMAIL) return children;

  return (
    <section style={{ height: '80vh' }}>
      <div className='container'>
        <h2>
          <CgDanger /> Permissão Negada
        </h2>
        <p>Essa página só pode ser acessada pelo Administrador</p>
        <br />
        <Link to='/'>
          <button className='--btn --btn-danger --btn-lg'>
            <AiOutlineArrowLeft />
            Voltar
          </button>
        </Link>
      </div>
    </section>
  );
};

export const UseAdminLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === process.env.REACT_APP_ADMIN_EMAIL) return children;
  else return null;
};
