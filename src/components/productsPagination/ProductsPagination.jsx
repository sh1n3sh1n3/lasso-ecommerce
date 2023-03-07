import { useState } from 'react';

import styles from './ProductsPagination.module.scss';

const ProductsPagination = ({
  productsPerPage,
  currentProductPage,
  setCurrentProductPage,
  totalNumberOfProducts,
}) => {
  const productsPagesNumbers = [];
  const totalNumberOfPages = totalNumberOfProducts / productsPerPage;
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const selectPage = (productsPagesNumbers) => {
    setCurrentProductPage(productsPagesNumbers);
  };

  for (let i = 1; i <= Math.ceil(totalNumberOfProducts / productsPerPage); i++) {
    productsPagesNumbers.push(i);
  }

  return (
    <ul className={styles.container}>
      <li>Anterior</li>
      {productsPagesNumbers.map((pageNumber) => {
        if (pageNumber < maxPageNumberLimit + 1 && pageNumber > minPageNumberLimit) {
          return (
            <li
              className={currentProductPage === pageNumber ? `${styles.active}` : null}
              key={pageNumber}
              onClick={() => selectPage(pageNumber)}>
              {pageNumber}
            </li>
          );
        }
      })}
      <li>Próxima</li>
      <p>
        <strong className={styles.page}>{`Página ${currentProductPage}`}</strong>
        <span>{` de `}</span>
        <strong className={styles.page}>{`${Math.ceil(totalNumberOfPages)}`}</strong>
      </p>
    </ul>
  );
};

export default ProductsPagination;
