import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectProducts,
  storeProducts,
  getProductPriceRange,
} from '../../redux/slices/productSlice';
import useFetchCollection from '../../customHooks/useFetchCollection';

import { ProductsFilter, ProductsList, Spinner } from '../index';

import styles from './ProductsContainer.module.scss';

const Product = () => {
  const { data, loading } = useFetchCollection('products');
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      storeProducts({
        products: data,
      }),
    );
    dispatch(getProductPriceRange({ products: data }));
  }, [dispatch, data]);

  return (
    <section>
      <div className={`container ${styles.container}`}>
        <aside className={styles.filter}>{loading ? null : <ProductsFilter />}</aside>
        <div className={styles.content}>
          {loading ? <Spinner /> : <ProductsList products={products} />}
        </div>
      </div>
    </section>
  );
};

export default Product;
