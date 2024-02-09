import React, { useState } from 'react';
import './styles.scss';

export const Slider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
  };

  const previousSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };

  return (
    <div className="slider">
      <button className="slider__btn slider__btn--previous" onClick={previousSlide}>
        Previous
      </button>
      <img className="slider__image" src={images[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
      <button className="slider__btn slider__btn--next" onClick={nextSlide}>
        Next
      </button>
    </div>
  );
};
