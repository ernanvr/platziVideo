const INITIAL_STATE = {
  user: {},
};

function loginUser(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        user: action.payload,
      };

    case 'LOGOUT_REQUEST':
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}

export default loginUser;
