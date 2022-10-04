const path = require('path');

module.exports = {
  name: 'word-relay-setting',
  mode: 'development', // 실서비스: production
  devtool: 'eval',
  resolve: {
    extensions: ['.jsx', '.js'],
  },

  entry: {
    app: './client.jsx', // ['./client.jsx', 'WordRelay.jsx'] 'WordRelay.jsx'는 이미 불러오고 있음.
  }, // 입력

  module: {
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: {
              browsers: ['> 1% in KR'], // browserslist
            },
            debug: true,
          }],
          '@babel/preset-react',
        ],
        plugins: ['@babel/plugin-proposal-class-properties'],
      },
    }],
  },

  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'), // __dirname = 현재 폴더, 'dist' = 경로
  }, // 출력
};