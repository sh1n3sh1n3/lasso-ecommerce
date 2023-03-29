import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import useFetchDocument from '../../customHooks/useFetchDocument';

import { BsArrowLeft } from 'react-icons/bs';
import spinnerGif from '../../assets/img/spinner.gif';

import styles from './OrderDetails.module.scss';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const { document } = useFetchDocument('orders', id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <section>
      <div className={`container ${styles.container}`}>
        <h2>Detalhes do Pedido</h2>
        <div>
          <Link className={styles['return-link']} to='/order-history'>
            <BsArrowLeft />
            Lista de Pedidos
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
              <strong>Status do Pedido: </strong>
              {order.orderStatus}
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
                  <th>Opções</th>
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
                      <td className={styles.icons}>
                        <Link to={`/review-product/${id}`}>
                          <button className='--btn --btn-primary'>Fazer Avaliação</button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
};

export default OrderDetails;
