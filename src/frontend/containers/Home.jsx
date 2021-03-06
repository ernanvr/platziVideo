import React, { Component } from 'react';
import { connect } from 'react-redux';
import Category from '../components/Category';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Search from '../components/Search';
import { IMGPathBase } from '../utils/Vars';
import '../assets/styles/style.scss';
import removeIcon from '../assets/static/remove-icon.png';
import plusIcon from '../assets/static/plus-icon.png';

class Home extends Component {

  pushData(typeMovieToShow) {

    const { popularMovies, topMovies, myList } = this.props;

    if (typeMovieToShow === 'popularMovies') {
      return (
        popularMovies.map(
          (item) => {
            return (
              <CarouselItem
                id={item.id}
                key={item.id}
                title={item.title}
                releasedDate={item.release_date}
                posterPath={IMGPathBase + item.poster_path}
                plusMinorIcon={plusIcon}
                remove={false}
              />
            );
          },
        )
      );

    } if (typeMovieToShow === 'topRatedMovies') {
      return (
        topMovies.map(
          (item) => (
            <CarouselItem
              id={item.id}
              key={item.id}
              title={item.title}
              releasedDate={item.release_date}
              posterPath={IMGPathBase + item.poster_path}
              plusMinorIcon={plusIcon}
              remove={false}
            />
          ),
        )
      );

    } if (typeMovieToShow === 'myList') {
      return (
        myList.map(
          (item) => (
            <CarouselItem
              id={item.id}
              key={item.id}
              title={item.title}
              releasedDate={item.releasedDate}
              posterPath={IMGPathBase + item.posterPath}
              plusMinorIcon={removeIcon}
              remove={true}
            />
          ),
        )
      );
    }

    return '';
  }

  render() {
    const { myList } = this.props;
    return (
      <>
        <Header />
        <Search isHome />
        {myList.length > 0 && (
          <Category category='Mi lista'>
            <Carousel>
              {this.pushData('myList')}
            </Carousel>
          </Category>
        )}
        <Category category='Populares'>
          <Carousel>
            {this.pushData('popularMovies')}
          </Carousel>
        </Category>
        <Category category='M??s Valoradas'>
          <Carousel>
            {this.pushData('topRatedMovies')}
          </Carousel>
        </Category>
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    popularMovies: state.chargeData.popularMovies,
    topMovies: state.chargeData.topMovies,
    myList: state.setFavorite.myList,
    user: state.loginUser.user,
  };
};

export default connect(mapStateToProps)(Home);
