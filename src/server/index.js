require('ignore-styles');

require('@babel/register')({
  presets: [['@babel/preset-env'], '@babel/preset-react'],
});

require('asset-require-hook')({
  extensions: ['png'],
  name: 'assets/images/[md4:hash:20].[ext]',
});

require('./server');
