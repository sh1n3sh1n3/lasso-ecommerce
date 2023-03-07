import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  filterProductsBySearch,
  selectFilteredProducts,
  sortProducts,
} from '../../../redux/slices/filterSlice';

import { BsFillGridFill } from 'react-icons/bs';
import { FaListAlt } from 'react-icons/fa';
import { ProductItem, SearchBar, ProductsPagination } from '../../index';

import styles from './ProductsList.module.scss';

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('latest');
  const [currentProductPage, setCurrentProductPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9);
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFilteredProducts);
  const indexOfLastProduct = currentProductPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    dispatch(sortProducts({ products, sort }));
  }, [dispatch, sort, products]);

  useEffect(() => {
    dispatch(filterProductsBySearch({ products, search }));
  }, [dispatch, search, products]);

  return (
    <div className={styles['grid-container']} id='products'>
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill size={22} color='var(--dark-orange)' onClick={() => setGrid(true)} />
          <FaListAlt size={24} color='var(--secondary-blue)' onClick={() => setGrid(false)} />
          <p>
            <strong>{filteredProducts.length}</strong> Produtos encontrados.
          </p>
        </div>
        <div>
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className={styles.sort}>
          <label>Filtrar:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value='latest'>Recentes</option>
            <option value='lowest-price'>Mais Baratos</option>
            <option value='highest-price'>Mais Caros</option>
            <option value='ascending'>Crescente</option>
            <option value='descending'>Decrescente</option>
          </select>
        </div>
      </div>
      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {products.length === 0 ? (
          <p>
            Não encontramos nenhum produto para a sua pesquisa. Remova os filtros e tente novamente.
          </p>
        ) : (
          <>
            {currentProducts.map((product) => {
              return (
                <div key={product.id}>
                  <ProductItem {...product} grid={grid} product={product} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <ProductsPagination
        productsPerPage={productsPerPage}
        currentProductPage={currentProductPage}
        setCurrentProductPage={setCurrentProductPage}
        totalNumberOfProducts={filteredProducts.length}
      />
    </div>
  );
};

export default ProductList;
