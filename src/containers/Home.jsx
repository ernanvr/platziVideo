import React, { Component } from 'react';
import { connect } from 'react-redux';
import Category from '../components/Category';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Search from '../components/Search';
import homeActions from '../actions/fetchData';
import { IMGPathBase } from '../utils/Vars'; import '../assets/styles/style.scss';

class Home extends Component {

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  pushData(typeMovieToShow) {

    const { popularMovies, topMovies } = this.props;

    if (typeMovieToShow === 'popularMovies') {
      return (
        popularMovies.map(
          (item) => (
            <CarouselItem
              key={item.id}
              title={item.title}
              releasedDate={item.release_date}
              posterPath={IMGPathBase + item.poster_path}
            />
          ),
        )
      );
    } if (typeMovieToShow === 'topRatedMovies') {
      return (
        topMovies.map(
          (item) => (
            <CarouselItem
              key={item.id}
              title={item.title}
              releasedDate={item.release_date}
              posterPath={IMGPathBase + item.poster_path}
            />
          ),
        )
      );

    }

    return '';
  }

  render() {
    return (
      <>
        <Search />
        <Category category='Mi lista'>
          <Carousel>
            { this.pushData('myList')}
          </Carousel>
        </Category>
        <Category category='Populares'>
          <Carousel>
            { this.pushData('popularMovies')}
          </Carousel>
        </Category>
        <Category category='Más Valoradas'>
          <Carousel>
            { this.pushData('topRatedMovies') }
          </Carousel>
        </Category>
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    popularMovies: state.reducers.chargeData.popularMovies,
    topMovies: state.reducers.chargeData.topMovies,
    myList: state.myList,
  };
};

export default connect(mapStateToProps, homeActions)(Home);
