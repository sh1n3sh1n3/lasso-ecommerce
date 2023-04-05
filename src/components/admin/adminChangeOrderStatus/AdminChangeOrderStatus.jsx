import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';

import { Card, Spinner } from '../../index';
import { toast } from 'react-toastify';

import styles from './AdminChangeOrderStatus.module.scss';

const AdminChangeOrderStatus = ({ order, id }) => {
  const [orderStatus, setOrderStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const editOrderStatus = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const orderConfig = {
      userId: order.userId,
      userEmail: order.userEmail,
      cartItems: order.cartItems,
      orderAmount: order.orderAmount,
      shippingAddress: order.shippingAddress,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderStatus: orderStatus,
      uploadTime: order.uploadTime,
      statusUpdatedTime: Timestamp.now().toDate(),
    };

    try {
      setDoc(doc(db, 'orders', id), orderConfig);
      setIsLoading(false);
      navigate('/admin/orders');
      toast.success('Status do pedido atualizado.');
    } catch (e) {
      setIsLoading(false);
      toast.error('Falha ao atualizar stauts do pedido.');
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      <div className={styles.container}>
        <Card cardClass={styles.card}>
          <h4>Atualizar Status do Pedido</h4>
          <form onSubmit={(e) => editOrderStatus(e, id)}>
            <span>
              <select value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>
                <option value='' disabled>
                  Selecione
                </option>
                <option value='Pedido Aceito'>Pedido Aceito</option>
                <option value='Pedido Enviado'>Pedido Enviado</option>
                <option value='Pedido Entregue'>Pedido Entregue</option>
              </select>
            </span>
            <span>
              <button className='--btn --btn-primary' type='submit'>
                Atualizar
              </button>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AdminChangeOrderStatus;
