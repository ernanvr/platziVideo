import https from 'https';

const initialState = {
  chargeData: {
    popularMovies: [],
    topMovies: [],
  },
  setFavorite: {
    myList: [],
  },
  loginUser: {
    user: [],
  },
  playing: {},
};

function fetch(urls, APIKey, state = initialState) {}

const urlsKeys = Object.keys(urls);

const initialStateCharDataKeys = Object.keys(initialState.chargeData);

for (let i = 0, len = urlsKeys.length; i < len; i++) {
  https.get(urls[urlsKeys[i]], (resp) => {
    let dataResult = '';

    resp.on('data', (chunk) => {
      dataResult += chunk;
    });

    resp.on('end', () => {
      for (let j = 0; j < initialStateCharDataKeys.length; j++) {
        if (urlsKeys[i] === initialStateCharDataKeys[j]) {
          initialState.chargeData[initialStateCharDataKeys[j]] = JSON.parse(dataResult);
        }
      }

    });

  }).on('error', (err) => {
    console.log(`Error: ${err.message}`);
  });
}

export default fetch;
