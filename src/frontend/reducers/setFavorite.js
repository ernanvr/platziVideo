
function setFavorite(state = { myList: [] }, action) {

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

