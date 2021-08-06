import React from 'react';
import '../assets/styles/components/Category.scss';

const Categories = ({ children, category }) => (
  <div className='categories'>
    <h2 className='categories__title'>{category}</h2>
    {children}
  </div>
);

export default Categories;
