const path = require('path');

module.exports = {
  name: 'gugudan-setting',
  mode: 'development', // 실서비스: production
  devtool: 'eval',     // 실서비스: hidden-source-map
  resolve: {
    extensions: ['.jsx', '.js'],
  },

  entry: {
    app: './client.jsx', //
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
        // plugins: ['@babel/plugin-proposal-class-properties'],
      },
    }],
  },

  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'), // __dirname = 현재 폴더, 'dist' = 경로
  }, // 출력
};