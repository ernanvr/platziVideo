import axios from 'axios';
import { APIPopular, APITopRated } from '../utils/Vars';

const fetchData = () => async (dispatch) => {
  const results = await Promise.all([axios.get(APIPopular), axios.get(APITopRated)]);

  dispatch({
    type: 'CHARGE_DATA',
    payload: {
      popularMovies: results[0].data.results,
      topMovies: results[1].data.results,
    },
  });
};

export default { fetchData };
