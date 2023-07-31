import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectProducts,
  storeProducts,
  getProductPriceRange,
} from '../../redux/slices/productSlice';
import useFetchCollection from '../../customHooks/useFetchCollection';

import { ProductsFilter, ProductsList, Spinner } from '../index';

import { FaCogs } from 'react-icons/fa';

import styles from './ProductsContainer.module.scss';

const Product = () => {
  const { data, loading } = useFetchCollection('products');
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const [showMobileFiltersList, setShowMobileFiltersList] = useState(false);

  useEffect(() => {
    dispatch(
      storeProducts({
        products: data,
      }),
    );
    dispatch(getProductPriceRange({ products: data }));
  }, [dispatch, data]);

  const toggleMobileFilter = () => {
    setShowMobileFiltersList(!showMobileFiltersList);
  };

  return (
    <section>
      <div className={`container ${styles.container}`}>
        <aside
          className={
            showMobileFiltersList ? `${styles.filter} ${styles.show}` : `${styles.filter}`
          }>
          {loading ? null : (
            <ProductsFilter
              setShowMobileFiltersList={setShowMobileFiltersList}
              showMobileFiltersList={showMobileFiltersList}
            />
          )}
        </aside>
        <div className={styles.content}>
          {loading ? <Spinner /> : <ProductsList products={products} />}
          <div className={styles.listToggler} onClick={toggleMobileFilter}>
            <FaCogs size={20} color='var(--dark-orange)' />
            <p>
              <strong>{showMobileFiltersList ? 'Esconder Filtros' : 'Mostrar Filtros '}</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
