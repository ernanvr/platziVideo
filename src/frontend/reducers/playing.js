function playing(state = {}, action) {
  switch (action.type) {
    case 'LOAD_SOURCE_VIDEO':
      return {
        ...state,
        id: action.payload.id,
        key: action.payload.key,
      };
    default:
      return state;
  }
}

export default playing;
