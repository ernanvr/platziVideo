import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import setFavorite from '../actions/setFavorite';
import '../assets/styles/components/CarouselItem.scss';

import playIcon from '../assets/static/play-icon.png';
import plusIcon from '../assets/static/plus-icon.png';

const CarouselItem = (props) => {

  const { title, releasedDate, posterPath } = props;

  const handleSetFavorite = () => {
    props.setFavorite(
      title, releasedDate, posterPath,
    );
  };

  return (
    <div className='carousel-item'>
      <img className='carousel-item__img' src={posterPath} alt={title} srcSet='' />
      <div className='carousel-item__details'>
        <div className='carousel-item__details--icons'>
          <img
            src={playIcon}
            alt='Play_Icon'
          />
          <img
            src={plusIcon}
            alt='Plus-Icon'
            onClick={handleSetFavorite}
          />
        </div>
        <p className='carousel-item__details--title'>{title}</p>
        <p className='carousel-item__details--subtitle'>{releasedDate}</p>
      </div>
    </div>
  );
};
CarouselItem.propTypes = {
  title: PropTypes.string,
  releasedDate: PropTypes.string,
  posterPath: PropTypes.string,
};

const mapDispatchToProps = {
  setFavorite,
};

export default connect(null, mapDispatchToProps)(CarouselItem);
