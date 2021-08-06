
export const APIPopular = `https://api.themoviedb.org/3/discover/movie?language=en-US&\
  sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=\
  flatrate&api_key=${process.env.APIKey}`;

export const APITopRated = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&sort_by\
  =popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=\
  flatrate&api_key=${process.env.APIKey}`;

export const IMGPathBase = 'https://image.tmdb.org/t/p/w500/';
