import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';

import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import { AiOutlineBars } from 'react-icons/ai';

import styles from './Header.module.scss';

const logo = (
  <div className={styles.logo}>
    <Link to='/'>
      <h2>
        Lasso<span>.</span>
      </h2>
    </Link>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : '');

const cart = (
  <span className={styles.cart}>
    <NavLink to='/cart' className={activeLink}>
      Carrinho
      <FaShoppingCart size={20} />
      <p>0</p>
    </NavLink>
  </span>
);

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logout efetuado com sucesso.');
        navigate('/');
      })
      .catch((e) => {
        toast.error('Erro. Tente novamente mais tarde.');
      });
  };

  return (
    <header>
      <div className={styles.header}>
        {logo}
        <nav className={showMenu ? `${styles['show-nav']}` : `${styles['hide-menu']}`}>
          <div
            className={
              showMenu
                ? `${styles['nav-wrapper']} ${styles['show-nav-wrapper']}`
                : `${styles['nav-wrapper']}`
            }
            onClick={hideMenu}></div>
          <ul onClick={hideMenu}>
            <li className={styles['logo-mobile']}>
              {logo}
              <FaTimes size={30} onClick={hideMenu} />
            </li>
            <li>
              <NavLink to='/' className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/contact' className={activeLink}>
                Contato
              </NavLink>
            </li>
          </ul>
          <div className={styles['header-right']} onClick={hideMenu}>
            <span className={styles.links}>
              <NavLink to='/login' className={activeLink}>
                Login
              </NavLink>
              <NavLink to='/register' className={activeLink}>
                Registrar
              </NavLink>
              <NavLink to='/order-history' className={activeLink}>
                Meus Pedidos
              </NavLink>
              <NavLink to='/' onClick={logout}>
                Sair
              </NavLink>
            </span>
            {cart}
          </div>
        </nav>
        <div className={styles['menu-icon']}>
          {cart}
          <AiOutlineBars size={30} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
