import React from 'react';
import { Link } from 'react-router-dom';
import googleIcon from '../assets/static/google-icon.png';
import twitterIcon from '../assets/static/twitter-icon.png';
import '../assets/styles/components/Login.scss';

const Login = () => (
  <section className='login'>
    <section className='login__container'>
      <h2>Inicia Sesión</h2>
      <form action='' className='login__container--form'>
        <input type='email' className='input' placeholder='Correo' />
        <input type='password' className='input' placeholder='Contraseña' />
        <button type='button' className='button'> Iniciar sesión</button>
        <div className='login__container--remember-me'>
          <label htmlFor='cbox1'>
            <input type='checkbox' id='cbox1' value='checkbox' />
            <span>Recuérdame</span>
          </label>
          <a href='/'>Olvidé mi contraseña</a>
        </div>
      </form>
      <section className='login__container--social-media'>
        <div>
          <img src={googleIcon} alt='' />
          <a href='/'>Iniciar sesión con Google</a>
        </div>
        <div>
          <img src={twitterIcon} alt='' />
          <a href='/'>Iniciar sesión con Twitter</a>
        </div>
      </section>
      <p className='login__container--register'>
        No tienes ninguna cuenta
        <Link to='/register'>
          <a href='/'>Regístrate</a>
        </Link>
      </p>
    </section>
  </section>
);

export default Login;
