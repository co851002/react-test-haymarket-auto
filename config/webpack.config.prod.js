var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var CSSMQSplitterPlugin = require('css-mq-splitter-plugin');
var url = require('url');
var paths = require('./paths');
var getClientEnvironment = require('./env');
var common = require('./webpack.common');

//translate sccs variables files into JSON. You get a JSON like: { 'variableName' : 'variableValue'}, just access the value: scssJson.variableName
var scssToJson = require('scss-to-json');

function ensureSlash(path, needsSlash) {
  var hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return path + '/';
  } else {
    return path;
  }
}

// We use "homepage" field to infer "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
var homepagePath = require(paths.appPackageJson).homepage;
var homepagePathname = homepagePath ? url.parse(homepagePath).pathname : '/';
// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
var publicPath = ensureSlash(homepagePathname, true);
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing shlash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
var publicUrl = ensureSlash(homepagePathname, false);
// Get enrivonment variables to inject into our app.
var env = getClientEnvironment(publicUrl);

/**
 * TO DO: This is the bit of code that creates the obj with the names of the css files to be splitted. The obj is then passed to the
 * CSSMQSplitterPlugin.
 * IF WE DECIDE TO STICK WITH ONE CSS FILES THAT CONTAINS ALL THE MEDIA QUERIES, WE CAN REMOVE THIS BIT, OTHERWISE WE CAN USE IT THEN.
 */
// var CSSMQSplitterPluginObj = {};
// //It gets the scss variables
// var scssVariables = scssToJson('src/themes/defaults/sass/vendor/bootstrap/_variables_custom.scss');
// //It takes the media queries defaults
// var sizes = Object.keys(scssVariables).reduce(function(result, key) {
//   var match = key.match(/^\$screen-([a-z]{2})$/);
//   if (match && result.indexOf(match[1]) == -1) {
//     result.push(match[1]);
//   }
//   return result;
// }, []);
// // create a map
// var map = sizes.reduce(function(result, size) {
//   result['mq-' + size] = 'screen and (min-width:' + scssVariables['$screen-' + size] + ')';
//   return result;
// }, {});
// // Flip the map for the plugin.
// CSSMQSplitterPluginObj = Object.keys(map).reduce(function(result, key) {
//   result[map[key]] = key;
//   return result;
// }, {});

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (env['process.env.NODE_ENV'] !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

common.bail = true;
common.devtool = 'source-map';
common.output.filename = 'static/js/[name].[chunkhash:8].js';
common.output.chunkFilename = 'static/js/[name].[chunkhash:8].chunk.js';
// 2 is css loader.
common.module.loaders[2]['loader'] = ExtractTextPlugin.extract('style', 'css?-autoprefixer!postcss');
common.plugins = [
  // Makes the public URL available as %PUBLIC_URL% in index.html, e.g.:
  // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
  // In production, it will be an empty string unless you specify "homepage"
  // in `package.json`, in which case it will be the pathname of that URL.
  new InterpolateHtmlPlugin({
    PUBLIC_URL: publicUrl
  }),
  // Makes some environment variables available to the JS code, for example:
  // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
  // It is absolutely essential that NODE_ENV was set to production here.
  // Otherwise React will be compiled in the very slow development mode.
  new webpack.DefinePlugin(env),
  // This helps ensure the builds are consistent if source hasn't changed:
  new webpack.optimize.OccurrenceOrderPlugin(),
  // Try to dedupe duplicated modules, if any:
  new webpack.optimize.DedupePlugin(),
  // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
  new ExtractTextPlugin('static/css/[name].[contenthash].css'),
  //new CSSMQSplitterPlugin(CSSMQSplitterPluginObj),
  // Minify the code.
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true, // React doesn't support IE8
      warnings: false
    },
    mangle: {
      screw_ie8: true
    },
    output: {
      comments: false,
      screw_ie8: true
    }
  }),
  function() {
    this.plugin('done', function(stats) {
      var assetBase = {
        'css': [],
        'js': []
      };
      var assets = stats.toJson().assets;
      // Write in the statistics.
      fs.writeFileSync(
        path.join('build', 'stats.json'),
        JSON.stringify(assets));
      assets = assets.reduce(function(result, asset) {

        var match = asset.name.match(/(\.(mq-[a-z]{2}))?\.(js|css)$/);
        if (match) {
          var attach = publicPath + asset.name;
          if (match[3] === 'css') {
            attach = {
              path: attach,
              media: match[2]
            };
          }
          assetBase[match[3]].push(attach);
        }
        return result;
      }, assetBase);
      // Save asset structure for the template usage.
      fs.writeFileSync(
        path.join('build', 'assets.json'),
        JSON.stringify(assets));
    });
  }
];

// Server specific configuration.
var server = Object.assign({}, common);
server.entry = paths.serverIndexJs;
server.target = 'node';
server.output = Object.assign({}, server.output, {filename: 'server/server.js'});
// Attach node modules.
server.externals = fs.readdirSync(path.join(__dirname, '..', 'node_modules'))
  .filter(entry => ['.bin'].indexOf(entry) === -1)
  .reduce((reduction, entry) => {
    const objectWithCommonJsModule = {};
    objectWithCommonJsModule[entry] = `commonjs ${entry}`;
    return Object.assign(reduction, objectWithCommonJsModule);
  }, {});
// Remove the stats plugin.
server.plugins = server.plugins.slice(0, -1);

module.exports = [common, server];
