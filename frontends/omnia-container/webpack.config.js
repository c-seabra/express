const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');
const dotenv = require('dotenv');
const SystemJSPublicPathWebpackPlugin = require('systemjs-webpack-interop/SystemJSPublicPathWebpackPlugin');

dotenv.config({
  path: '../../.env',
});

module.exports = (webpackConfigEnv, argv) => {
  const orgName = 'websummit-micro';
  // this is a hack to just get it to build somehow
  // the html plugin is the interesting bit
  const defaultConfig = {
    mode: 'production',
    entry: './importmap.json',
    output: {
      filename: 'importmap.json',
      libraryTarget: 'system',
      path: path.resolve(__dirname, './dist'),
      uniqueName: 'omnia-container',
      devtoolNamespace: 'omnia-container',
      publicPath: '',
    },
    devServer: {
      compress: true,
      historyApiFallback: true,
      headers: { 'Access-Control-Allow-Origin': '*' },
      firewall: false,
      client: { host: 'localhost' },
    },
    externals: ['single-spa', /^@websummit-micro\//],
    plugins: [
      new SystemJSPublicPathWebpackPlugin({
        // optional: defaults to 1
        // If you need the webpack public path to "chop off" some of the directories in the current module's url, you can specify a "root directory level". Note that the root directory level is read from right-to-left, with `1` indicating "current directory" and `2` indicating "up one directory":
        rootDirectoryLevel: 1,
      }),
    ],
    resolve: {
      extensions: [
        '.mjs',
        '.js',
        '.jsx',
        '.wasm',
        '.json',
        '.ts',
        '.tsx',
        '.json',
      ],
    },
  };

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: 'src/index.ejs',
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
          apiURL: process.env.API_URL,
          token: process.env.AUTH_TOKEN,
        },
      }),
      new EnvironmentPlugin([
        'PRODUCTION_API_URL',
        'PRODUCTION_STORES_TOKEN',
        'AUTH_TOKEN',
        'API_URL',
      ]),
    ],
  });
};
