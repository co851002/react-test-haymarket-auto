import PropTypes from 'prop-types';
import { lazyFunction } from 'helpers/lazyFunction';

/**
 * @typedef {PropTypes.shape} MenuItemsShape
 * @prop {PropTypes.number} mlid - unique id of the menu item.
 * @prop {PropTypes.string} text - text that will be used as a link.
 * @prop {PropTypes.string} path - url of the menu item.
 * @prop {PropTypes.bool} active - indicator if menu item is currently active.
 * @prop {MenuItemsShape} children - Menu Items that are children of the current Menu Item.
 */

/**
 * Shape of a Menu Item.
 *
 * @type {MenuItemsShape}
 */
const MenuItemsShape = PropTypes.shape({
  mlid: PropTypes.number,
  text: PropTypes.string,
  path: PropTypes.string,
  active: PropTypes.bool,
  children: PropTypes.arrayOf(lazyFunction(() => MenuItemsShape))
});

export default MenuItemsShape;
