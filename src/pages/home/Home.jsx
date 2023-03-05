import { useEffect } from 'react';
import { Carousel, ProductsContainer } from '../../components/index';

import styles from './Home.module.scss';

const Home = () => {
  const url = window.location.href;
  const jumpToProductsSection = () => {
    if (url.includes('#products')) {
      window.scrollTo({ top: 700, behavior: 'smooth' });
      return;
    }
  };

  useEffect(() => {
    jumpToProductsSection();
  }, []);

  return (
    <div>
      <Carousel />
      <ProductsContainer />
    </div>
  );
};

export default Home;
