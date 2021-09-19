import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import loginRequest from '../actions/loginRequest';

const Register = (props) => {

  const [form, setValues] = useState({
    email: '',
    name: '',
    password: '',
  });

  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.loginRequest(form);
    props.history.push('/');
  };

  return (
    <>
      <Header isRegister />
      <section className='login'>
        <section className='login__container'>
          <h2>Regístrate</h2>
          <form action='' className='login__container--form' onSubmit={handleSubmit}>
            <input
              name='name'
              type='text'
              className='input'
              placeholder='Nombre completo'
              onChange={handleInput}
            />
            <input
              name='email'
              type='email'
              className='input'
              placeholder='Correo'
              onChange={handleInput}
            />
            <input
              name='password'
              type='password'
              className='input'
              placeholder='Contraseña'
              onChange={handleInput}
            />
            <button type='submit' className='button' onClick={handleInput}>Registrarse</button>
          </form>
          <div className='login__container--remember-me'>
            <Link to='/login'>
              Iniciar sesión
            </Link>
          </div>
        </section>
      </section>
    </>
  );
};

const mapDispatchToProps = {
  loginRequest,
};

export default connect(null, mapDispatchToProps)(Register);
