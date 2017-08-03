var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var findCacheDir = require('find-cache-dir');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
var getClientEnvironment = require('./env');
var paths = require('./paths');
var common = require('./webpack.common');

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
var publicPath = '/';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing shlash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
var publicUrl = '';
// Get enrivonment variables to inject into our app.
var env = getClientEnvironment(publicUrl);


common.entry.unshift(require.resolve('react-dev-utils/webpackHotDevClient'));
// 0 is babel loader
common.module['loaders'][0]['query'] = {
  // This is a feature of `babel-loader` for webpack (not Babel itself).
  // It enables caching results in ./node_modules/.cache/react-scripts/
  // directory for faster rebuilds. We use findCacheDir() because of:
  // https://github.com/facebookincubator/create-react-app/issues/483
  cacheDirectory: findCacheDir({
    name: 'react-scripts'
  })
};
//We expose the React Perf tool to the browser console with the expose-loader.
common.module['loaders'].push({
  test: require.resolve('react-addons-perf'),
  loader: 'expose?Perf'
});
common.output.pathinfo = true;
common.plugins = [
  // Makes the public URL available as %PUBLIC_URL% in index.html, e.g.:
  // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
  // In development, this will be an empty string.
  new InterpolateHtmlPlugin({
    PUBLIC_URL: publicUrl
  }),
  // Generates an `index.html` file with the <script> injected.
  new HtmlWebpackPlugin({
    inject: true,
    template: paths.appHtml,
  }),
  // Makes some environment variables available to the JS code, for example:
  // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
  new webpack.DefinePlugin(env),
  // This is necessary to emit hot updates (currently CSS only):
  new webpack.HotModuleReplacementPlugin(),
  // Watcher doesn't work well if you mistype casing in a path so we use
  // a plugin that prints an error when you attempt to do this.
  // See https://github.com/facebookincubator/create-react-app/issues/240
  new CaseSensitivePathsPlugin(),
  // If you require a missing module and then `npm install` it, you still have
  // to restart the development server for Webpack to discover it. This plugin
  // makes the discovery automatic so you don't have to restart.
  // See https://github.com/facebookincubator/create-react-app/issues/186
  new WatchMissingNodeModulesPlugin(paths.appNodeModules),
  // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
  new ExtractTextPlugin('static/css/[name].[contenthash:8].css', {
    allChunks: true
  })
];

module.exports = common;
