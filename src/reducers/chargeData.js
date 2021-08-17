const INITIAL_STATE = {
  popularMovies: [],
  topMovies: [],
};

function chargeData(state = INITIAL_STATE, action) {

  switch (action.type) {
    case 'CHARGE_DATA':
      return {
        ...state,
        popularMovies: action.payload.popularMovies,
        topMovies: action.payload.topMovies,
      };

    default:
      return state;

  }
}

export default chargeData;
