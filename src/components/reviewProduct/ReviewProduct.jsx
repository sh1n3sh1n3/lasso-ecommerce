import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import StarsRating from 'react-star-rate';

import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { selectUserId, selectUserName } from '../../redux/slices/authSlice';

import useFetchDocument from '../../customHooks/useFetchDocument';

import { toast } from 'react-toastify';
import { Card } from '../index';
import spinnerGif from '../../assets/img/spinner.gif';

import styles from './ReviewProduct.module.scss';

const ReviewProduct = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState('');
  const [fetchProduct, setFetchProduct] = useState(null);
  const { id } = useParams();
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);
  const { document } = useFetchDocument('products', id);

  useEffect(() => {
    setFetchProduct(document);
  }, [document]);

  const submitReview = (e) => {
    e.preventDefault();

    const getDate = new Date();
    const dateString = `${getDate.getDate()}/${getDate.getMonth() + 1}/${getDate.getFullYear()}`;

    const reviewConfig = {
      userId,
      userName,
      productId: id,
      rate,
      review,
      reviewDate: dateString,
      uploadTime: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, 'reviews'), reviewConfig);
      toast.success('Parabéns, você deixou a sua avaliação do produto!');
      setRate(0);
      setReview('');
    } catch (e) {
      toast.error('Erro ao fazer avaliação do produto. Tente novamente mais tarde.');
    }
  };

  return (
    <section>
      <div className={`container ${styles.container}`}>
        <h2>Avaliar Produto</h2>
        {fetchProduct === null ? (
          <img style={{ width: '70px' }} src={spinnerGif} alt='Carregando' />
        ) : (
          <>
            <p>
              <strong>Produto: </strong>
              {fetchProduct.name}
            </p>
            <img
              style={{ width: '200px', marginBlock: '30px' }}
              src={fetchProduct.imgUrl}
              alt={fetchProduct.name}
            />
          </>
        )}

        <Card cardClass={styles.card}>
          <form onSubmit={(e) => submitReview(e)}>
            <label>Estrelas:</label>
            <StarsRating
              value={rate}
              onChange={(value) => {
                setRate(value);
              }}
            />
            <label>Review:</label>
            <textarea
              cols='30'
              rows='10'
              value={review}
              required
              onChange={(e) => setReview(e.target.value)}></textarea>
            <button className='--btn --btn-primary' type='submit'>
              Enviar Avaliação
            </button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ReviewProduct;
