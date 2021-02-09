const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');

const ReplacePlugin = require('webpack-plugin-replace');

const dotenv = require('dotenv');

dotenv.config();

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    argv,
    orgName: 'websummit-micro',
    projectName: 'staff-tickets',
    webpackConfigEnv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new ReplacePlugin({
        include: [
          /src\/Websummit-.+.tsx$/
        ],
        patterns: [{
          regex: /process\.env\.[A-Z_]+/g,
          value: (match) => JSON.stringify(process.env[match])
        }],
      })
    ]
  });
};
