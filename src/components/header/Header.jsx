import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config';

import { toast } from 'react-toastify';
import { FaShoppingCart, FaTimes, FaUserCircle } from 'react-icons/fa';
import { AiOutlineBars } from 'react-icons/ai';

import { setActiveUser, removeActiveUser } from '../../redux/slices/authSlice';
import {
  calculateProductsTotalQuantity,
  selectCartTotalQuantity,
} from '../../redux/slices/cartSlice';

import { DisplayOnLogin, DisplayOnLogout } from '../linksLogic/LinksLogic';
import { UseAdminLink } from '../adminRoute/AdminRoute';

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

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const headerTotalCartQuantity = useSelector(selectCartTotalQuantity);

  useEffect(() => {
    dispatch(calculateProductsTotalQuantity());
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName == null) {
          const sliceUser = user.email.split('@');
          const setName = sliceUser[0];
          setCurrentUser(setName);
        } else {
          setCurrentUser(user.displayName);
        }
        dispatch(
          setActiveUser({
            email: user.email,
            userName: user.displayName ? user.displayName : currentUser,
            userId: user.uid,
          }),
        );
      } else {
        setCurrentUser('');
        dispatch(removeActiveUser());
      }
    });
  }, [dispatch, currentUser]);

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

  const cart = (
    <span className={styles.cart}>
      <NavLink to='/cart' className={activeLink}>
        Carrinho
        <FaShoppingCart size={20} />
        <p>{headerTotalCartQuantity}</p>
      </NavLink>
    </span>
  );

  return (
    <header>
      <div className={styles.header}>
        {logo}
        <nav className={showMenu ? `${styles['show-nav']}` : `${styles['hide-nav']}`}>
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
            <UseAdminLink>
              <li>
                <Link to='/admin/home'>
                  <button className='--btn --btn-primary'>Admin</button>
                </Link>
              </li>
            </UseAdminLink>
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
              <DisplayOnLogout>
                <NavLink to='/login' className={activeLink}>
                  Login
                </NavLink>
              </DisplayOnLogout>
              <DisplayOnLogin>
                <a href='#user' className={styles['user']}>
                  <FaUserCircle size={18} />
                  <span>{currentUser}</span>
                </a>
              </DisplayOnLogin>
              <DisplayOnLogin>
                <NavLink to='/order-history' className={activeLink}>
                  Pedidos
                </NavLink>
              </DisplayOnLogin>
              <DisplayOnLogin>
                <NavLink to='/' onClick={logout}>
                  Sair
                </NavLink>
              </DisplayOnLogin>
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
