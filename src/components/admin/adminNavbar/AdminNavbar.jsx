import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { CgArrowUpR, CgArrowDownR } from 'react-icons/cg';

import { selectUserName } from '../../../redux/slices/authSlice';

import styles from './AdminNavbar.module.scss';

export const AdminNavbar = () => {
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
            <NavLink className={activeLink} to='/admin/view-all-products'>
              Ver Produtos
            </NavLink>
          </li>
          <li>
            <NavLink className={activeLink} to='/admin/add-product/new'>
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

export const MobileAdminNavbar = () => {
  const userName = useSelector(selectUserName);

  const [toggleMobileNavBar, setToggleMobileNavBar] = useState(false);

  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : '');

  const mobileNavBarHandler = () => {
    setToggleMobileNavBar(!toggleMobileNavBar);
  };

  return (
    <div className={styles['mobile-navbar']}>
      <h2>Menu Admin</h2>
      <nav className={toggleMobileNavBar ? `${styles.active}` : ''}>
        <div></div>
        <ul>
          <li onClick={() => setToggleMobileNavBar(false)}>
            <NavLink className={activeLink} to='/admin/view-all-products'>
              Ver Produtos
            </NavLink>
          </li>
          <li onClick={() => setToggleMobileNavBar(false)}>
            <NavLink className={activeLink} to='/admin/add-product/new'>
              Adicionar Produto
            </NavLink>
          </li>
          <li onClick={() => setToggleMobileNavBar(false)}>
            <NavLink className={activeLink} to='/admin/orders'>
              Pedidos
            </NavLink>
          </li>
          <li>
            <p>Usuário: {userName}</p>
          </li>
        </ul>
      </nav>
      <div className={styles['mobile-navbar-toggler']} onClick={mobileNavBarHandler}>
        {!toggleMobileNavBar ? (
          <CgArrowUpR />
        ) : (
          <CgArrowDownR style={{ color: 'var(--dark-orange)' }} />
        )}
      </div>
    </div>
  );
};
