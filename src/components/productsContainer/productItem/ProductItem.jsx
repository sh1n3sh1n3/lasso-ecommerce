import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addToCart } from '../../../redux/slices/cartSlice';

import { Card } from '../../index';

import styles from './ProductItem.module.scss';

const ProductItem = ({ product, id, grid, name, price, desc, imgUrl }) => {
  const dispatch = useDispatch();

  const breakText = (text, textLength) => {
    if (text.length > textLength) {
      const brokenText = text.substring(0, textLength).concat('...');
      return brokenText;
    }
    return text;
  };

  const addProductToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${id}`}>
        <div className={styles.img}>
          <img src={imgUrl} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>{`R$:${price},00`}</p>
          <h4>{breakText(name, grid ? 18 : 28)}</h4>
        </div>
        {!grid && <p className={styles.desc}>{breakText(desc, 200)}</p>}
        <button className='--btn --btn-danger' onClick={() => addProductToCart(product)}>
          Adicionar Ao Carrinho
        </button>
      </div>
    </Card>
  );
};

export default ProductItem;
