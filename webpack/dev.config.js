const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  devtool: 'eval-source-map',

  devServer: {
    inline: true,
    contentBase: 'src',
    port: '3001',
    publicPath: '/user-finder/',
    historyApiFallback: true,
  },

  module: {
    rules: [
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
});
