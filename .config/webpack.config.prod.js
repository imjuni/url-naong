const tsconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const devConfig = require('./webpack.config.dev');

const config = merge(devConfig, {
  resolve: {
    plugins: [
      new tsconfigPathsWebpackPlugin({
        configFile: 'tsconfig.prod.json',
      }),
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
});

module.exports = config;
