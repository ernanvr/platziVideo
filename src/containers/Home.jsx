import React, { Component } from 'react';
import { connect } from 'react-redux';
import Category from '../components/Category';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Search from '../components/Search';
import homeActions from '../actions/fetchData';
import { IMGPathBase } from '../utils/Vars'; import '../assets/styles/style.scss';
import removeIcon from '../assets/static/remove-icon.png';
import plusIcon from '../assets/static/plus-icon.png';

class Home extends Component {

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

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
        <Search />
        {myList.length > 0 && (
          <Category category='Mi lista'>
            <Carousel>
              { this.pushData('myList')}
            </Carousel>
          </Category>
        )}
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
    myList: state.reducers.setFavorite.myList,
    user: state.reducers.loginUser.user,
  };
};

export default connect(mapStateToProps, homeActions)(Home);
