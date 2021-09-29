import https from 'https';

function isEmpty(obj) {
  // eslint-disable-next-line no-restricted-syntax
  for (const i in obj) return false;
  return true;
}

function isString(string) {
  return (typeof string === 'string' || (string instanceof String));
}

function fetchState(state) {

  const initialState = state;

  const reducers = Object.keys(state);

  for (let i = 0; i < reducers.length; i++) {
    const reducer = Object.keys(state[reducers[i]]);

    if (!isEmpty(state[reducers[i]]) && isString(state[reducers[i]])) {

      try {
        https.get(state[reducers[i]], (resp) => {
          let data = '';

          resp.on('data', (chunk) => {
            data += chunk;
          });

          resp.on('end', () => {
            initialState[reducers[i]] = data;

            return initialState;
          });

        }).on('error', (err) => {

          initialState[reducers[i]] = err.message;

          return initialState;

        });

      } catch (err) {

        initialState[reducers[i]] = err.message;

        return initialState;
      }
    }

    for (let j = 0; j < reducer.length; j++) {
      if (!isEmpty(state[reducers[i]][reducer[j]]) && isString(state[reducers[i]][reducer[j]])) {

        try {
          https.get(state[reducers[i]][reducer[j]], (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
              data += chunk;
            });

            resp.on('end', () => {
              initialState[reducers[i]][reducer[j]] = data;

              return initialState;
            });

          }).on('error', (err) => {
            initialState[reducers[i]][reducer[j]] = err.message;

            return initialState;
          });
        } catch (err) {
          initialState[reducers[i]] = err.message;

          return initialState;
        }

      } else {
        initialState[reducers[i]][reducer[j]] = {};
      }

    }

  }

  return initialState;
}

export default fetchState;
