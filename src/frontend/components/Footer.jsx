import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/Footer.scss';

const Footer = () => (
  <footer className='footer'>
    <Link to='/'>Términos de uso</Link>
    <Link to='/'>Declaración de Privacidad</Link>
    <Link to='/'>Centro de ayuda</Link>
    <Link to='/login'>login</Link>
    <Link to='/register'>Register</Link>
  </footer>
);

export default Footer;
