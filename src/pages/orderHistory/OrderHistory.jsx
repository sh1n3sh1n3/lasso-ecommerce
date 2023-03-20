import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useFetchCollection from '../../customHooks/useFetchCollection';

import { selectOrderHistory, storeOrders } from '../../redux/slices/orderSlice';
// import { selectUserId } from '../../redux/slices/authSlice';

import { Spinner } from '../../components/index';

import styles from './OrderHistory.module.scss';

const OrderHistory = () => {
  const { data, isLoading } = useFetchCollection('orders');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchOrders = useSelector(selectOrderHistory);
  // const userId = useSelector(selectUserId);

  useEffect(() => {
    dispatch(storeOrders(data));
  }, [dispatch, data]);

  const openOrderDetail = (id) => {
    navigate(`/order-details/${id}`);
  };

  return (
    <section>
      <div className={`container ${styles.order}`}>
        <h2>Lista de Pedidos</h2>
        <p>
          Selecione um pedido para deixar sua <strong>avaliação</strong>.
        </p>
        <br />
        <>
          {isLoading && <Spinner />}
          <div className={styles.container}>
            {fetchOrders.length === 0 ? (
              <p>Nenhum pedido encontrado.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Nº</th>
                    <th>Data</th>
                    <th>ID do Pedido</th>
                    <th>Valor Total</th>
                    <th>Situação do Pedido</th>
                  </tr>
                </thead>
                <tbody>
                  {fetchOrders.map((order, index) => {
                    const { id, orderDate, orderTime, orderAmount, orderStatus } = order;
                    const orderNumber = index + 1;

                    return (
                      <tr key={id} onClick={() => openOrderDetail(id)}>
                        <td>{orderNumber}</td>
                        <td>
                          {orderDate} em {orderTime}
                        </td>
                        <td>{id}</td>
                        <td>{`R$:${orderAmount.toFixed(2)}`}</td>
                        <td>
                          <p
                            className={`${
                              orderStatus !== 'Entregue'
                                ? `${styles.pending}`
                                : `${styles.delivered}`
                            }`}>
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </section>
  );
};

export default OrderHistory;
