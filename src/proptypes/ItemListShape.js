import PropTypes from 'prop-types';
import { lazyFunction } from 'helpers/lazyFunction';

/**
 * @typedef {PropTypes.shape} ItemListShape
 * @prop {PropTypes.any} content - any renderable content.
 * @prop {PropTypes.objectOf~PropTypes.string} attributes - attributes to apply to a list item.
 * @prop {ItemListShape} children - List Items objects that are children of a parent List Item.
 */

/**
 * Shape of a List Item.
 *
 * @type {ItemListShape}
 */
const ItemListShape = PropTypes.shape({
  content: PropTypes.any,
  attributes: PropTypes.objectOf(PropTypes.string),
  children: PropTypes.arrayOf(lazyFunction(() => ItemListShape))
});
export default ItemListShape;
