import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import logoutRequest from '../actions/logoutRequest';
import gravatar from '../utils/gravatar';
import '../assets/styles/components/Header.scss';

import logo from '../assets/static/logo-platzi-video.png';
import userIcon from '../assets/static/user-icon.png';

const Header = (props) => {
  const { user, isLogin, isRegister } = props;
  const hasUser = Object.keys(user).length > 0;

  const handleLogout = () => props.logoutRequest({});

  const headerClass = classNames('header', {
    isLogin, isRegister,
  });

  return (
    <header className={headerClass}>
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
          {hasUser ? null :
            (
              <li>
                <Link to='/register'>Crear cuenta</Link>
              </li>
            )}
          {hasUser ?
            (
              <li>
                <Link to='/login' onClick={handleLogout}>
                  Cerrar sesión
                </Link>
              </li>
            ) :
            (
              <li>
                <Link to='/login'>
                  Iniciar sesión
                </Link>
              </li>
            )}
        </ul>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  user: state.loginUser.user,
});

const mapDispatchToProps = {
  logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
