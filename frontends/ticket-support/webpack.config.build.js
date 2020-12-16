const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CircularDependencyPlugin = require('circular-dependency-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
require('dotenv').config()

const config = {
  entry: {
    ticketSupport: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'frontends.[name].bundle.js',
    library: ['frontends', '[name]'],
    libraryTarget: 'window',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  plugins: [new CleanWebpackPlugin()],
}

module.exports = (env, argv) => {
  if (process.env.mode === 'analyse') {
    config.plugins = config.plugins.concat([
      new BundleAnalyzerPlugin(),
      new CircularDependencyPlugin({
        exclude: /node_modules/,
        failOnError: true,
        allowAsyncCycles: false,
        cwd: process.cwd(),
      }),
    ])
  }

  if (argv.mode === 'development') {
    config.plugins = config.plugins.concat([
      new HtmlWebPackPlugin({
        template: 'template.html',
        filename: './index.html',
        title: 'ticketSupport',
        token: process.env.TOKEN,
        env: process.env.ENV,
      }),
    ])
    config.devServer = {
      contentBase: path.join(__dirname, 'dist'),
    }
  }

  return config
}
