import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import setFavorite from '../actions/setFavorite';
import deleteFavorite from '../actions/deleteFavorite';
import '../assets/styles/components/CarouselItem.scss';

import playIcon from '../assets/static/play-icon.png';

const CarouselItem = (props) => {

  const { id, title, releasedDate, posterPath, plusMinorIcon, remove } = props;

  const handleFavorite = (id) => {

    if (!remove) {
      if (props.myList.length === 0 || (!props.myList.find((e) => e.id === id) && props.myList.length > 0)) {
        props.setFavorite(
          { id, title, releasedDate, posterPath },
        );
      } else {
        console.log('Duplicated favorite movie');
      }
    } else {
      props.deleteFavorite(id);
    }
  };

  return (
    <div className='carousel-item'>
      <img className='carousel-item__img' src={posterPath} alt={title} srcSet='' />
      <div className='carousel-item__details'>
        <div className='carousel-item__details--icons'>
          <Link to={`/player/${id}`}>
            <img
              src={playIcon}
              alt='Play_Icon'
            />
          </Link>
          <img
            src={plusMinorIcon}
            alt='Plus-Icon'
            onClick={() => handleFavorite(id)}
          />
        </div>
        <p className='carousel-item__details--title'>{title}</p>
        <p className='carousel-item__details--subtitle'>{releasedDate}</p>
      </div>
    </div>
  );
};

CarouselItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  releasedDate: PropTypes.string,
  posterPath: PropTypes.string,
  plusMinorIcon: PropTypes.string,
  remove: PropTypes.bool,
};

const mapDispatchToProps = {
  setFavorite, deleteFavorite,
};

const mapStateToProps = (state) => {
  return ({ myList: state.setFavorite.myList });
};

export default connect(mapStateToProps, mapDispatchToProps)(CarouselItem);
