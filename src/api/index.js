/**
 * TODO
 * Flow linting must be turned on for this file when its reveisited.
 * Remove the api path in eslint-plugin-disable in .eslintrc.js
 */

/**
 * Get data for the menu.
 *
 * @param {string} mids - id of the menu to fetch.
 * @return {Promise} - promise with new data.
 */
export const fetchMenu = (mids = []) => {
  const query = mids.join(',');
  return fetch('/api/config/menus?menus=' + query, {
    accept: 'application/json',
  }).then((data) => {
    return data.json();
  });
};

/**
 * Get data for the teasers.
 *
 * @param {string} mids - id of the menu to fetch.
 * @return {Promise} - promise with new data.
 */
export const fetchTeasers = (mids = []) => {
  const query = mids.join(',');
  return fetch('/api/config/teasers?teasers=' + query, {
    accept: 'application/json',
  }).then((data) => {
    return data.json();
  });
};

/**
 * Get properties.
 *
 * @param  {array} props - name of properties to get.
 * @return {Promise} - promise with new data.
 */
export const fetchProps = (props) => {
  const query = props.join('&');
  return fetch('/api/config/properties?' + query, {
    accept: 'application/json',
  }).then((data) => {
    return data.json();
  });
};
