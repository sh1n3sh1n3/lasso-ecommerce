import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { collection, query, onSnapshot, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../../firebase/config';

import Spinner from '../../spinner/Spinner';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Notiflix from 'notiflix';

import styles from './AdminViewProducts.module.scss';
import { deleteObject, ref } from 'firebase/storage';

const AdminViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    setLoading(true);
    try {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, orderBy('uploadTime', 'desc'));
      onSnapshot(q, (snapshot) => {
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(allProducts);
        setLoading(false);
      });
    } catch (e) {
      setLoading(false);
      toast.error('Não foi possível exibir os produtos.');
    }
  };

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
      {products.length === 0 ? (
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
          {products.map((product, i) => {
            const { id, name, price, imgUrl, category } = product;

            return (
              <tbody>
                <tr key={id}>
                  <td>{i + 1}</td>
                  <td>
                    <img src={imgUrl} alt={name} style={{ width: '100px' }} />
                  </td>
                  <td>{name}</td>
                  <td>{category}</td>
                  <td>{`R$${price},00`}</td>
                  <td className={styles.icons}>
                    <Link to='/admin/add-product'>
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
    </div>
  );
};

export default AdminViewProducts;
