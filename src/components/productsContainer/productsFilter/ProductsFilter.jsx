import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterProductsBySearch,
  filterProductsByCategory,
} from '../../../redux/slices/filterSlice';

import { AiOutlineDoubleRight } from 'react-icons/ai';

import { selectProducts } from '../../../redux/slices/productSlice';

import styles from './ProductsFilter.module.scss';

const ProductFilter = () => {
  const [category, setCategory] = useState('Todos');
  const products = useSelector(selectProducts);

  const dispatch = useDispatch();

  const allProductsCategories = ['Todos', ...new Set(products.map((product) => product.category))];

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
        <select name='brand'>
          <option value='Todos'></option>
        </select>
        <h4>Preço até</h4>
        <p>1500</p>
        <div className={styles.price}>
          <input type='range' name='price' min='10' max='5000' />
        </div>
        <button className='--btn --btn-danger'>Limpar Filtros</button>
      </div>
    </div>
  );
};

export default ProductFilter;
