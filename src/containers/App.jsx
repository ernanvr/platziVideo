import React, { useState, useEffect } from 'react';
import Category from '../components/Category';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Header from '../components/Header';
import Search from '../components/Search';
import Footer from '../components/Footer';
import { APIPopular, APITopRated } from '../utils/Vars';
import '../assets/styles/style.scss';

const App = () => {
  const [results, updateFetchStat] = useState({
    fetching: true,
    results: [],
  });

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch(APIPopular);
      const data = await response.json();
      updateFetchStat({ fetching: false, results: data.results });
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
              results.results.map((item) => <CarouselItem key={item.id} title={item.title} />)
          }
        </Carousel>
      </Category>
      <Category category='Más valoradas' />
      <Footer />
    </div>
  );
};

export default App;
