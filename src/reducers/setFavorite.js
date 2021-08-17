const INITIAL_STATE = {
  myList: [],
};

function setFavorite(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_FAVORITE':
      return {
        ...state,
        myList: [...state.myList, action.payload],
      };

    default:
      return state;

  }
}

export default setFavorite;
