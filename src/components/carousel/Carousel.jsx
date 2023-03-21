import { useState } from 'react';

import { imgData } from './img-data';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

import './Carousel.scss';

function Carousel() {
  const [currentImg, setCurrentImg] = useState(0);

  const imgLength = imgData.length;

  const nextImg = () => {
    setCurrentImg(currentImg === imgLength - 1 ? 0 : currentImg + 1);
  };
  const prevImg = () => {
    setCurrentImg(currentImg === 0 ? imgLength - 1 : currentImg - 1);
  };

  return (
    <div className='carousel'>
      <SlArrowLeft className='arrow prev' onClick={prevImg} />
      <SlArrowRight className='arrow next' onClick={nextImg} />

      {imgData.map((e, i) => {
        const { image, title, description } = e;

        return (
          <div key={i} className={i === currentImg ? 'carousel-item current' : 'carousel-item'}>
            {i === currentImg && (
              <>
                <img src={image} alt='' />
                <div className='content'>
                  <h2>{title}</h2>
                  <p>{description}</p>
                  <hr />
                  <a className='--btn --btn-primary' href='#products'>
                    Compre Agora
                  </a>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Carousel;
