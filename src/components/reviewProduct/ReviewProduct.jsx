import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import StarsRating from 'react-star-rate';

import { selectProducts } from '../../redux/slices/productSlice';

import { Card } from '../index';

import styles from './ReviewProduct.module.scss';

const ReviewProduct = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState('');
  const { id } = useParams();
  const products = useSelector(selectProducts);

  const product = products.find((item) => item.id === id);

  const submitReview = (e) => {
    e.preventDefault();

    console.log(rate, review);
  };

  return (
    <section>
      <div className={`container ${styles.container}`}>
        <h2>Avaliar Produto</h2>
        <p>
          <strong>Produto: </strong>
          {product.name}
        </p>
        <img
          style={{ width: '200px', marginBlock: '30px' }}
          src={product.imgUrl}
          alt={product.name}
        />
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
