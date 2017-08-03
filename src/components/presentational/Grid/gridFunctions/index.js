import styles from 'components/Grid.scss';
import { viewports } from 'hayPropTypes';

/**
 * Used to get the responsive styles for cols and rows.
 * @param {String} prefix - a class prefix.
 * @param {String} key - a prop key.
 * @param {String | Array} value - a prop keyvalue that is one viewport size (string) or many viewport sizes (array).
 * @return {Array} - a styles class array.
 * - An xs and up class if value is 'true'
 * - Returns one class if prop value is a string and viewport size.
 * - Multiple classes if pro value is an array.
 */
export const getResponsiveClasses = ((prefix, key, value) => {
  // If prop value is true set a xs and up class.
  if (value === true) {
    return styles[`${prefix}-${key}-xs`];
  }

  // If prop value is a string and a viewport size add one alignment class for that viewport.
  if (typeof value === 'string' && viewports.includes(value)) {
    return styles[`${prefix}-${key}-${value}`];
  }

  // If prop value is an array add an alignment class for each viewport in the array.
  // Filter out any array items that are not a valid viewport size.
  if (value instanceof Array && value.length) {
    return value.filter(item => viewports.includes(item))
      .map((item) => styles[`${prefix}-${key}-${item}`])
      .filter((item) => item);
  }
});
