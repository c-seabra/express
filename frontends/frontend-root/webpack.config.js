const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-ts');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');
const dotenv = require('dotenv');

dotenv.config({
  path: '../../.env',
});

module.exports = (webpackConfigEnv, argv) => {
  const orgName = 'websummit-micro';
  const defaultConfig = singleSpaDefaults({
    argv,
    disableHtmlGeneration: true,
    orgName,
    projectName: 'root-config',
    webpackConfigEnv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: 'src/index.ejs',
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
      new EnvironmentPlugin([
        'SANDBOX_API_URL',
        'SANDBOX_STORES_TOKEN',
        'PRODUCTION_API_URL',
        'PRODUCTION_STORES_TOKEN',
        'AUTH_TOKEN',
        'API_URL',
      ]),
    ],
  });
};
