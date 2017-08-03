/**
 * Generates JS markup based on array of paths.
 *
 * @param  {string[]} js - array of strings which are paths to files.
 * @return {string} html markup with script tags.
 */
const generateJS = (js) =>
  js.map(path => `<script type="text/javascript" src="${path}"></script>`).join('');

  /**
   * Generates JS markup based on array of paths.
   * 
   * @param  {string[]} css - array of strings which are paths to files.
   * @return {string} html markup with stylesheet tags.
   */
const generateCSS = (css) =>
  css.map(asset => `<link rel="stylesheet" type="text/css" href="${asset.path}" ${asset.media ? `media="${asset.media}"` : '' }/>`).join('\n');

export default (content, js, css, data, storeData) => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Whatcar?</title>
    ${ generateCSS(css) }
  </head>
  <body>
    <div id="root">${content}</div>
    <script>window.__REACT_REDUX_PAYLOAD__ = ${JSON.stringify(storeData)}</script>
    ${ generateJS(js) }
  </body>
</html>
`;