import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import useFetchDocument from '../../../customHooks/useFetchDocument';

import { AdminChangeOrderDetails } from '../../index';
import { BsArrowLeft } from 'react-icons/bs';
import spinnerGif from '../../../assets/img/spinner.gif';

import styles from './AdminOrderDetails.module.scss';

const AdminOrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const { document } = useFetchDocument('orders', id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <>
      <div className={`container ${styles.container}`}>
        <h2>
          Pedido Nº:{' '}
          {order === null ? (
            'Carregando...'
          ) : (
            <span style={{ color: 'var(--dark-orange)' }}>{order.id}</span>
          )}
        </h2>
        <div>
          <Link className={styles['return-link']} to='/admin/orders'>
            <BsArrowLeft />
            Todos os Pedidos
          </Link>
        </div>
        <br />
        {order === null ? (
          <img style={{ width: '50px' }} src={spinnerGif} alt='Carregando' />
        ) : (
          <>
            <p>
              <strong>ID: </strong>
              {order.id}
            </p>
            <p>
              <strong>Valor Total: </strong>
              <strong style={{ color: 'var(--dark-orange)' }}>{`R$:${order.orderAmount.toFixed(
                2,
              )}`}</strong>
            </p>
            <p>
              <strong>Data e Hora: </strong>
              {order.orderDate} ás {order.orderTime}
            </p>
            <p>
              <strong>Status do Pedido: </strong>
              {order.orderStatus}
            </p>
            <br />
            <p>
              <strong>Endereço de Envio: </strong>
              <br />
              Rua: {order.shippingAddress.lineOne}
              <br />
              Referência:{' '}
              {order.shippingAddress.lineTwo === '' ? 'N/A' : order.shippingAddress.lineTwo}
              <br />
              Cidade: {order.shippingAddress.city}
              <br />
              Estado: {order.shippingAddress.state}
              <br />
              CEP: {order.shippingAddress.postalCode}
            </p>
            <br />
            <p>
              <strong>Dados do Cliente: </strong>
              <br />
              Nome: {order.shippingAddress.name}
              <br />
              Telefone: {order.shippingAddress.phone}
              <br />
              Email: {order.userEmail}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>Nº</th>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cartItem, index) => {
                  const { id, name, price, imgUrl, cartTotalQuantity } = cartItem;
                  return (
                    <tr key={id}>
                      <td>
                        <strong>{index + 1}</strong>
                      </td>
                      <td>
                        <p>
                          <strong>{name}</strong>
                        </p>
                        <img style={{ width: '100px' }} src={imgUrl} alt={name} />
                      </td>
                      <td>{`R$:${price.toFixed(2)}`}</td>
                      <td>
                        <strong>{cartTotalQuantity}</strong>
                      </td>
                      <td>{`R$:${(price * cartTotalQuantity).toFixed(2)}`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
        <AdminChangeOrderDetails order={order} id={id} />
      </div>
    </>
  );
};

export default AdminOrderDetails;
