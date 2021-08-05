import React from 'react';
import '../assets/styles/components/Category.scss';

const Categories = ({ children }) => (
	<div className='categories'>
		<h2 className='categories__title'>Populares</h2>
		{children}
	</div>
);

export default Categories;
