import { Route, Routes } from 'react-router-dom';

import {
  AdminNavbar,
  AdminHome,
  AdminViewProducts,
  AdminAddProduct,
  AdminOrders,
} from '../../components/index';

import styles from './Admin.module.scs s';

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <AdminNavbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path='home' element={<AdminHome />}></Route>
          <Route path='view-all-products' element={<AdminViewProducts />}></Route>
          <Route path='add-product' element={<AdminAddProduct />}></Route>
          <Route path='home' element={<AdminHome />}></Route>
          <Route path='orders' element={<AdminOrders />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
