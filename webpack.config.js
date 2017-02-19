const webpack = require('webpack');
const path = require('path');

const devMode = process.env.NODE_ENV === 'development';

const config = {
  entry: {
    app: './src/client',
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/assets',
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        loaders: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015'],
            },
          },
          {
            loader: 'react-svg-loader',
            query: {
              jsx: true,
            },
          },
        ],
      },
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
        ],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'USER_FINDER_OAUTH',
    ]),
  ],
  devServer: {
    contentBase: 'dist',
    inline: true,
    port: '3001',
    publicPath: '/assets',
    historyApiFallback: true,
  },
  devtool: devMode ? 'eval-source-map' : null,
};

module.exports = config;
