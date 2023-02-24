import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { selectUserName } from '../../../redux/slices/authSlice';

import styles from './AdminNavbar.module.scss';

const AdminNavbar = () => {
  const userName = useSelector(selectUserName);

  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : '');

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <h2>Área Admin</h2>
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink className={activeLink} to='/admin/home'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={activeLink} to='/admin/view-all-products'>
              Ver Produtos
            </NavLink>
          </li>
          <li>
            <NavLink className={activeLink} to='/admin/add-product'>
              Adicionar Produto
            </NavLink>
          </li>
          <li>
            <NavLink className={activeLink} to='/admin/orders'>
              Pedidos
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminNavbar;
