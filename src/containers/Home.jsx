import React from 'react';
import { connect } from 'react-redux';
import Category from '../components/Category';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Search from '../components/Search';
import { APIPopular, APITopRated, IMGPathBase } from '../utils/Vars';
import fetchVideos from '../hooks/fetchVideosInfo';
import homeFetchData from '../actions/homeFetchData';
import '../assets/styles/style.scss';

const Home = () => {

  const fetchedVideos = fetchVideos(APIPopular, APITopRated);

  return (
    <>
      <Search />
      <Category category='Populares'>
        <Carousel>
          {
            fetchedVideos.fetching ? <div>Loading</div> :
              fetchedVideos.popularMovies.map(
                (item) => (
                  <CarouselItem
                    key={item.id}
                    title={item.title}
                    releasedDate={item.release_date}
                    posterPath={IMGPathBase + item.poster_path}
                  />
                ),
              )
          }
        </Carousel>
      </Category>
      <Category category='Más Valoradas'>
        <Carousel>
          {
            fetchedVideos.fetching ? <div>Loading</div> :
              fetchedVideos.topMovies.map(
                (item) => (
                  <CarouselItem
                    key={item.id}
                    title={item.title}
                    releasedDate={item.release_date}
                    posterPath={IMGPathBase + item.poster_path}
                  />
                ),
              )
          }
        </Carousel>
      </Category>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    myList: state.myList,
    trends: state.trends,
    populars: state.popular,
    topMovies: state.topMovies,
  };
};

export default connect(mapStateToProps, homeFetchData)(Home);
