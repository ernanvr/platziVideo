const getVideoSource = (payload) => (dispatch) => {
  dispatch({
    type: 'LOAD_SOURCE_VIDEO',
    payload: {
      id: payload.id,
      key: payload.key,
    },
  });
};

export default getVideoSource;
