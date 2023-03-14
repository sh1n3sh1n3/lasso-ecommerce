import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from '../../redux/slices/cartSlice';

import { Card } from '../index';

import styles from './CheckoutSummary.module.scss';

const CheckoutSummary = () => {
  const cartTotalItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  return (
    <div>
      <h3>Valor Checkout</h3>
      <div>
        {cartTotalItems === 0 ? (
          <>
            <p>Você ainda não possui produtos no carrinho.</p>
            <button className='--btn'>
              <Link to='/#products'>Ir As Compras</Link>
            </button>
          </>
        ) : (
          <div>
            <p>
              <strong>{`Produto(s) no carrinho: ${cartTotalQuantity}`}</strong>
            </p>
            <div className={styles.text}>
              <h4>Subtotal:</h4>
              <h3>{cartTotalAmount.toFixed(2)}</h3>
            </div>
            {cartTotalItems.map((cartItem, index) => {
              const { id, name, price, cartTotalQuantity } = cartItem;
              return (
                <Card key={id} cardClass={styles.card}>
                  <h4>
                    Produto: <span>{name}</span>
                  </h4>
                  <p>
                    Quantidade: <strong>{cartTotalQuantity}</strong>
                  </p>
                  <p>
                    Preço por unidade:{' '}
                    <strong style={{ color: 'var(--dark-orange)' }}>{price.toFixed(2)}</strong>
                  </p>
                  <p>
                    Preço total:{' '}
                    <strong style={{ color: 'var(--dark-orange)' }}>
                      {(price * cartTotalQuantity).toFixed(2)}
                    </strong>
                  </p>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
