const path = require('path');
const tsconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');
const webpackNodeExternals = require('webpack-node-externals');

const distPath = path.resolve(path.join(__dirname, '..', 'dist'));

const config = {
  devtool: 'inline-source-map',
  externals: [
    webpackNodeExternals({
      allowlist: ['tslib'],
    }),
  ],
  mode: 'development',
  target: 'node',

  resolve: {
    fallback: {
      __dirname: false,
      __filename: false,
      console: false,
      global: false,
      process: false,
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    plugins: [
      new tsconfigPathsWebpackPlugin({
        configFile: 'tsconfig.json',
      }),
    ],
  },

  entry: {
    index: [path.join(__dirname, '..', 'src', 'index.ts')],
  },

  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs',
    path: distPath,
  },

  optimization: {
    minimize: false, // <---- disables uglify.
    // minimizer: [new UglifyJsPlugin()] if you want to customize it.
  },

  module: {
    rules: [
      {
        loader: 'json-loader',
        test: /\.json$/,
      },
      {
        exclude: /node_modules/,
        loader: 'ts-loader',
        test: /\.tsx?$/,
        options: {
          configFile: 'tsconfig.json',
        },
      },
    ],
  },
};

module.exports = config;
