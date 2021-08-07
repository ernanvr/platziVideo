import React, { useState, useEffect } from 'react';
import Category from '../components/Category';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Header from '../components/Header';
import Search from '../components/Search';
import Footer from '../components/Footer';
import { APIPopular, APITopRated, IMGPathBase } from '../utils/Vars';
import '../assets/styles/style.scss';

const App = () => {
  const [results, updateFetchStat] = useState({
    fetching: true,
    popularMovies: [],
    topMovies: [],
  });

  useEffect(() => {
    const fetchAPI = async () => {
      async function fetcher(url) {
        const response = await fetch(url);
        return response.json();
      }

      const data = [];
      data[0] = await fetcher(APIPopular);
      data[1] = await fetcher(APITopRated);
      updateFetchStat({ fetching: false, popularMovies: data[0].results, topMovies: data[1].results });
    };
    fetchAPI();
  }, []);

  return (
    <div className='App'>
      <Header />
      <Search />
      <Category category='Populares'>
        <Carousel>
          {
            results.fetching ? <div>wait</div> :
              results.popularMovies.map(
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
            results.fetching ? <div>wait</div> :
              results.topMovies.map(
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
      <Footer />
    </div>
  );
};

export default App;
