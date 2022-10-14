const path = require('path');
const LoaderOptionPlugin = require('webpack/lib/LoaderOptionsPlugin');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

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
        // plugins: ['react-refresh/babel'],
      },
    }],
  },

  plugins: [
    new RefreshWebpackPlugin(),
  ],

  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'), // __dirname = 현재 폴더, 'dist' = 경로
  }, // 출력

  devServer: {
    devMiddleware: { publicPath: '/dist' },
    static: { directory: path.resolve(__dirname, 'src') },
    hot: true,
  },

};