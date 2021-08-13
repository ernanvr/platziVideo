function chargeData(state, action) {

  switch (action.type) {
    case 'CHARGE_DATA':
      return {
        ...state,
        populars: popularMovies,
        topMovies,
      };

    default:
      return state;

  }
}

export default chargeData;
