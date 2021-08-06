import React from 'react';
import '../assets/styles/components/Header.scss';

import logo from '../assets/static/logo-platzi-video.png';
import userIcon from '../assets/static/user-icon.png';

const Header = () => (
  <header>
    <img
      className='header__img'
      src={logo}
      alt='Logo-platzi-video'
    />
    <div className='header__menu'>
      <div className='header__menu--profile'>
        <img className='material-icons' src={userIcon} alt='user_logo' />
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
