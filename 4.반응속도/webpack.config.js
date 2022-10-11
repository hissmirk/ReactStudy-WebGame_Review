const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  name: 'response-check',
  mode: 'development',
  devtool: 'eval',
  resolve: {
    extensions: ['.jsx', '.js'],
  },

  entry: {
    app: './client.jsx'
  },

  module: {
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: {
              browsers: ['> 1% in KR'],
            },
            debug: true,
          }],
          '@babel/preset-react',
        ],
      },
    }],
  },

  plugins: [
    new RefreshWebpackPlugin(),
  ],

  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
  },

  devServer: {
    devMiddleware: { publicPath: '/dist' },
    static: { directory: path.resolve(__dirname, 'src') },
    hot: true,
  },

};
