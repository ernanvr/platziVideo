import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => (
  <section className='login'>
    <section className='login__container'>
      <h2>Regístrate</h2>
      <form action='' className='login__container--form'>
        <input type='text' className='input' placeholder='Nombre completo' />
        <input type='email' className='input' placeholder='Correo' />
        <input type='password' className='input' placeholder='Contraseña' />
        <button type='button' className='button'>Registrarse</button>
      </form>
      <div className='login__container--remember-me'>
        <Link to='/login'>
          <a href='/'>Iniciar sesión</a>
        </Link>
      </div>
    </section>
  </section>

);

export default Register;
