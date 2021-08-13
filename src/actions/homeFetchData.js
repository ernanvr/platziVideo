import fetchVideos from '../hooks/fetchVideosInfo';
import { APIPopular, APITopRated } from '../utils/Vars';

const fetchData = () => (dispatch) => {
  const response = fetchVideos(APIPopular, APITopRated);

  dispatch({
    type: 'CHARGE_DATA',
    payload: response,
  });
};

export default { fetchData };
