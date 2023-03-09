import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  addToCart,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
  decreaseCartProductQuantity,
  removeProductFromCart,
} from '../../redux/slices/cartSlice';

import { Card } from '../../components/index';

import { HiOutlineArrowLeft } from 'react-icons/hi';
import { FaTrashAlt } from 'react-icons/fa';
import { BsArrowLeft } from 'react-icons/bs';

import styles from './Cart.module.scss';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const decreaseProductQuantity = (cart) => {
    dispatch(decreaseCartProductQuantity(cart));
  };

  const increaseProductQuantity = (cart) => {
    dispatch(addToCart(cart));
  };

  const removeSelectedProduct = (cart) => {
    dispatch(removeProductFromCart(cart));
  };

  return (
    <section>
      <div className={`container ${styles.container}`}>
        <h2>Carrinho de Compras</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Carrinho de compras vazio.</p>
            <br />
            <div>
              <Link to='/#products'>
                <HiOutlineArrowLeft /> Ir As Compras
              </Link>
            </div>
          </>
        ) : (
          <>
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
                {cartItems.map((cart, index) => {
                  const { id, name, price, imgUrl, cartTotalQuantity } = cart;

                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <strong>{name}</strong>
                        </p>
                        <img src={imgUrl} alt={name} style={{ width: '100px' }} />
                      </td>
                      <td>{price}</td>
                      <td>
                        <div className={styles.count}>
                          <button className='--btn' onClick={() => decreaseProductQuantity(cart)}>
                            -
                          </button>
                          <p>
                            <strong>{cartTotalQuantity}</strong>
                          </p>
                          <button className='--btn' onClick={() => increaseProductQuantity(cart)}>
                            +
                          </button>
                        </div>
                      </td>
                      <td>{(price * cartTotalQuantity).toFixed(2)}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt
                          size={18}
                          color='var(--color-danger)'
                          onClick={() => removeSelectedProduct(cart)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className={styles.summary}>
              <button className='--btn --btn-danger'>Limpar Carrinho</button>
              <div className={styles.checkout}>
                <div>
                  <Link to='/#product'>
                    <BsArrowLeft size={12} /> Continuar comprando
                  </Link>
                </div>
                <br />
                <Card cardClass={styles.card}>
                  <p>{`Produto(s) no carrinho: ${cartTotalQuantity}`}</p>
                  <div className={styles.text}>
                    <h4>Subtotal:</h4>
                    <h3>{`R$:${cartTotalAmount.toFixed(2)},00`}</h3>
                  </div>
                  <p>Juros e frete calculados no próximo passo.</p>
                  <button className='--btn --btn-block --btn-primary'>Continuar</button>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
