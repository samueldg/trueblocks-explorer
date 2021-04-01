const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const tsconfigLocation = path.resolve(__dirname, './tsconfig_ui.json');
const getSourceLocation = (...subdirectories) => ['./src/ui', ...subdirectories].join('/');

module.exports = () => ({
  entry: getSourceLocation('index.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/ui'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback: { path: require.resolve('path-browserify') },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true,
          configFile: tsconfigLocation,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv({ safe: true }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: tsconfigLocation,
      },
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: getSourceLocation('index.html'),
    }),
  ],
  devtool: 'source-map',
});
