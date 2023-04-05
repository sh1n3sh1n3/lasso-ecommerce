import { Route, Routes } from 'react-router-dom';

import {
  AdminNavbar,
  AdminViewProducts,
  AdminAddProduct,
  AdminOrders,
  AdminOrderDetails,
} from '../../components/index';

import styles from './Admin.module.scss';

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <AdminNavbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path='view-all-products' element={<AdminViewProducts />}></Route>
          <Route path='add-product/:id' element={<AdminAddProduct />}></Route>
          <Route path='orders' element={<AdminOrders />}></Route>
          <Route path='order-details/:id' element={<AdminOrderDetails />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
