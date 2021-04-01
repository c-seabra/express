const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
require('dotenv').config();

const config = {
  entry: {
    ticketManagement: './src/index.js',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        exclude: /\.module\.css$/,
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        include: /\.module\.css$/,
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              sourceMap: true,
            },
          },
        ],
      },
      {
        exclude: /node_modules/,
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
      },
    ],
  },
  output: {
    filename: 'frontends.[name].bundle.js',
    library: {
      type: 'system',
    },
    publicPath: '/',
    path: path.resolve(__dirname, '../../builds/ticket-management'),
  },
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
};

module.exports = (env, argv) => {
  if (process.env.mode === 'analyse') {
    config.plugins = config.plugins.concat([
      new BundleAnalyzerPlugin(),
      new CircularDependencyPlugin({
        allowAsyncCycles: false,
        cwd: process.cwd(),
        exclude: /node_modules/,
        failOnError: true,
      }),
    ]);
  }

  if (argv.mode === 'development') {
    config.plugins = config.plugins.concat([
      new HtmlWebPackPlugin({
        env: process.env.ENV,
        filename: './index.html',
        template: 'template.html',
        title: 'events',
        token: process.env.TOKEN,
      }),
    ]);
    config.devServer = {
      contentBase: path.join(__dirname, 'dist'),
    };
  }

  return config;
};
