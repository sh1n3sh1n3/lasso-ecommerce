import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { BsArrowLeft } from 'react-icons/bs';
import { Spinner } from '../../index';
import {
  addToCart,
  decreaseCartProductQuantity,
  calculateProductsTotalQuantity,
  selectCartItems,
} from '../../../redux/slices/cartSlice';

import useFetchDocument from '../../../customHooks/useFetchDocument';

import styles from './ProductDetails.module.scss';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const cartItemsQuantity = useSelector(selectCartItems);
  const findCartItem = cartItemsQuantity.find((cartItem) => cartItem.id === id);
  const isProductInCart = cartItemsQuantity.findIndex((cartItem) => cartItem.id === id);

  const { document } = useFetchDocument('products', id);

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const addProductToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(calculateProductsTotalQuantity());
  };

  const decreaseCartProductItem = (product) => {
    dispatch(decreaseCartProductQuantity(product));
    dispatch(calculateProductsTotalQuantity());
  };

  return (
    <section>
      <div className={styles.container}>
        <h2>Detalhes</h2>
        <div>
          <Link className={styles['return-link']} to='/#products'>
            <BsArrowLeft /> Todos os produtos
          </Link>
        </div>
        {product === null ? (
          <Spinner />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imgUrl} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{`R$:${product.price},00`}</p>
                <p>{product.desc}</p>
                <p>
                  <strong>ID</strong> {product.id}
                </p>
                <p>
                  <strong>Marca/Empresa</strong>{' '}
                  <span style={{ color: 'var(--primary-blue)', letterSpacing: '1px' }}>
                    {product.brand}
                  </span>
                </p>
                <div className={styles.count}>
                  {isProductInCart < 0 ? null : (
                    <>
                      <button className='--btn' onClick={() => decreaseCartProductItem(product)}>
                        -
                      </button>
                      <p>
                        <strong>{findCartItem.cartTotalQuantity}</strong>
                      </p>
                      <button className='--btn' onClick={() => addProductToCart(product)}>
                        +
                      </button>
                    </>
                  )}
                </div>
                <button className='--btn --btn-danger' onClick={() => addProductToCart(product)}>
                  Adicionar Ao Carrinho
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
