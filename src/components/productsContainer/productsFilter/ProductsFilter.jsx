import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterProductsByCategory,
  filterProductsByBrand,
  filterProductsByPrice,
} from '../../../redux/slices/filterSlice';

import { AiOutlineDoubleRight } from 'react-icons/ai';

import { selectMaxPrice, selectMinPrice, selectProducts } from '../../../redux/slices/productSlice';

import styles from './ProductsFilter.module.scss';

const ProductFilter = () => {
  const [category, setCategory] = useState('Todos');
  const [brand, setBrand] = useState('Todos');
  const [price, setPrice] = useState(3000);
  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  const dispatch = useDispatch();

  const allProductsCategories = ['Todos', ...new Set(products.map((product) => product.category))];
  const allProductsBrands = ['Todos', ...new Set(products.map((product) => product.brand))];

  useEffect(() => {
    dispatch(filterProductsByBrand({ products, brand }));
  }, [dispatch, products, brand]);

  useEffect(() => {
    dispatch(filterProductsByPrice({ products, price }));
  }, [dispatch, products, price]);

  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(filterProductsByCategory({ products, category: cat }));
  };

  return (
    <div className={styles.container}>
      <h4>Categorias</h4>
      <div className={styles.categories}>
        {allProductsCategories.map((cat, index) => {
          return (
            <button
              key={index}
              type='button'
              className={`${category}` === cat ? `${styles.active}` : null}
              onClick={() => filterProducts(cat)}>
              <AiOutlineDoubleRight /> {cat}
            </button>
          );
        })}
      </div>
      <h4>Marca/Empresa</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allProductsBrands.map((brand, index) => {
            return (
              <option key={index} value={brand}>
                {brand}
              </option>
            );
          })}
        </select>
        <h4>Preço até</h4>
        <p>{`R$:${price},00`}</p>
        <div className={styles.price}>
          <input
            type='range'
            min={minPrice}
            max={maxPrice}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button className='--btn --btn-danger'>Limpar Filtros</button>
      </div>
    </div>
  );
};

export default ProductFilter;
