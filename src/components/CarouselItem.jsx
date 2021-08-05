import React from 'react';
import '../assets/styles/components/CarouselItem.scss';

const CarouselItem = () => (
	<div className='carousel-item'>
		<img className='carousel-item__img' src='${IMG_URL}' alt='' srcset='' />
		<div className='carousel-item__details'>
			<div className='carousel-item__details--icons'>
				<img src='https://img.icons8.com/ios-glyphs/30/26e07f/play--v1.png' />
				<img src='https://img.icons8.com/color/48/000000/plus--v3.png' />
			</div>
			<p className='carousel-item__details--title'>{title}</p>
			<p className='carousel-item__details--subtitle'>{release_date}</p>
		</div>
	</div>
);

export default CarouselItem;
