import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../../firebase/config';
import { deleteObject, ref } from 'firebase/storage';

import { selectProducts, storeProducts } from '../../../redux/slices/productSlice';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import { filterProductsBySearch, selectFilteredProducts } from '../../../redux/slices/filterSlice';

import { Spinner, SearchBar, ProductsPagination } from '../../index';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Notiflix from 'notiflix';

import styles from './AdminViewProducts.module.scss';

const AdminViewProducts = () => {
  const [search, setSearch] = useState('');
  const { data, loading } = useFetchCollection('products');
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);
  const [currentProductPage, setCurrentProductPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9);
  const indexOfLastProduct = currentProductPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    dispatch(
      storeProducts({
        products: data,
      }),
    );
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(filterProductsBySearch({ products, search }));
  }, [dispatch, search, products]);

  const confirmProductDeletion = (id, imgUrl) => {
    Notiflix.Confirm.show(
      'Remover produto!',
      'Tem certeza que quer remover esse produto da lista?',
      'Remover',
      'Cancelar',
      function okCb() {
        deleteProduct(id, imgUrl);
      },
      function cancelCb() {
        return;
      },
      {
        width: '300px',
        borderRadius: '2px',
        titleColor: '#f56600',
        okButtonBackground: '#f56600',
        cssAnimationStyle: 'zoom',
      },
    );
  };

  const deleteProduct = async (id, imgUrl) => {
    try {
      // Delete the product document
      await deleteDoc(doc(db, 'products', id));
      // Delete the product image
      const imageRef = ref(storage, imgUrl);
      await deleteObject(imageRef);
      toast.success('Produto removido com sucesso.');
    } catch (e) {
      toast.error('Não foi possível remover o produto. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.container}>
      {loading && <Spinner />}
      <h2>Todos os Produtos</h2>
      <div className={styles.search}>
        <p>
          <strong>{filteredProducts.length}</strong> produtos encontrados.
        </p>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      {filteredProducts.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nº</th>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Opções</th>
            </tr>
          </thead>
          {currentProducts.map((product, i) => {
            const { id, name, price, imgUrl, category } = product;

            return (
              <tbody key={id}>
                <tr>
                  <td>{i + 1}</td>
                  <td>
                    <img src={imgUrl} alt={name} style={{ width: '100px' }} />
                  </td>
                  <td>{name}</td>
                  <td>{category}</td>
                  <td>{`R$${price},00`}</td>
                  <td className={styles.icons}>
                    <Link to={`/admin/add-product/${id}`}>
                      <FaEdit size={20} style={{ color: 'var(--color-success)' }} />
                    </Link>
                    <FaTrashAlt
                      size={18}
                      style={{ color: 'var(--color-danger)' }}
                      onClick={() => confirmProductDeletion(id, imgUrl)}
                    />
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      )}
      <ProductsPagination
        productsPerPage={productsPerPage}
        currentProductPage={currentProductPage}
        setCurrentProductPage={setCurrentProductPage}
        totalNumberOfProducts={filteredProducts.length}
      />
    </div>
  );
};

export default AdminViewProducts;
