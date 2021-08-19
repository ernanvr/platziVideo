import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import gravatar from '../utils/gravatar';
import '../assets/styles/components/Header.scss';

import logo from '../assets/static/logo-platzi-video.png';
import userIcon from '../assets/static/user-icon.png';

const Header = (props) => {
  console.log(props);
  const { user } = props;
  const hasUser = Object.keys(user).length > 0;

  return (
    <header>
      <Link to='/'>
        <img
          className='header__img'
          src={logo}
          alt='Logo-platzi-video'
        />
      </Link>
      <div className='header__menu'>
        <div className='header__menu--profile'>
          {hasUser ?
            <img src={gravatar(user.email)} alt='user-avatar' className='material-icons' /> :
            <img className='material-icons' src={userIcon} alt='user_logo' />}
          <p>Perfil</p>
        </div>
        <ul className='header__menu--submenu'>
          <li>
            <a href='/'>Cuenta</a>
          </li>
          <Link to='/login'>
            Iniciar sesión
          </Link>
        </ul>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  user: state.reducers.loginUser.user,
});

export default connect(mapStateToProps, null)(Header);
