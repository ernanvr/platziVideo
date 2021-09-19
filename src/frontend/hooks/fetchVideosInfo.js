import { useState, useEffect } from 'react';

const fetchVideosInfo = (url1, url2) => {
  const [results, updateFetchStat] = useState({
    fetching: true,
    popularMovies: [],
    topMovies: [],
  });

  useEffect(() => {
    const fetchAPIs = async () => {
      async function fetcher(url) {
        const response = await fetch(url);
        return response.json();
      }
      const data = [];

      data[0] = await fetcher(url1);
      data[1] = await fetcher(url2);
      updateFetchStat({ fetching: false, popularMovies: data[0].results, topMovies: data[1].results });
    };
    fetchAPIs();
  }, []);

  return results;
};

export default fetchVideosInfo;
