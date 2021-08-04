import React from 'react';
import '../assets/styles/components/Header.scss';

const Header = () => (
	<header>
		<img
			className='header__img'
			src='/assets/logo-platzi-video-BW2.png'
			alt='Logo-platzi-video'
		/>
		<div className='header__menu'>
			<div className='header__menu--profile'>
				<span className='material-icons'> account_box </span>
				<p>Perfil</p>
			</div>
			<ul className='header__menu--submenu'>
				<li>
					<a href='/'>Cuenta</a>
				</li>
				<li>
					<a href='/'>Cerrar cesión</a>
				</li>
			</ul>
		</div>
	</header>
);

export default Header;
