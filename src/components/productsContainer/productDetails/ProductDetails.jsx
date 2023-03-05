import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';

import { BsArrowLeft } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { Spinner } from '../../index';

import styles from './ProductDetails.module.scss';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    const productRef = doc(db, 'products', id);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      const obj = {
        id: id,
        ...productSnap.data(),
      };
      setProduct(obj);
    } else {
      toast.error('Produto não encontrado');
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

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
                  <button className='--btn '>-</button>
                  <p>
                    <strong>1</strong>
                  </p>
                  <button className='--btn '>+</button>
                </div>
                <button className='--btn --btn-danger'>Adicionar Ao Carrinho</button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
