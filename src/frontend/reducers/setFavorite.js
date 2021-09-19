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

    case 'DELETE_FAVORITE':
      return {
        ...state,
        myList: state.myList.filter((e) => e.id !== action.payload),
      };

    default:
      return state;

  }
}

export default setFavorite;
