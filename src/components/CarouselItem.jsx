import React from 'react';
import '../assets/styles/components/CarouselItem.scss';

const CarouselItem = ({ title }) => (
  <div className='carousel-item'>
    <img className='carousel-item__img' src='' alt={title} srcSet='' />
    <div className='carousel-item__details'>
      <div className='carousel-item__details--icons'>
        <img src='' alt='' />
        <img src='' alt='' />
      </div>
      <p className='carousel-item__details--title'>{title}</p>
      <p className='carousel-item__details--subtitle'>hola</p>
    </div>
  </div>
);

export default CarouselItem;
