import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
//Helpers
import classNames from 'classnames';
// Components
/**
 * <Image /> component.
 */
class Image extends PureComponent {
  /**
   * Implements propTypes().
   *
   * @return {Object} - propType object.
   * @prop {string} className - class name for image.
   * @prop {string} src - image source.
   * @prop {string} title - title attribute.
   * @prop {string} alt - alt attribute for logo.
   */
  static get propTypes() {
    return {
      className: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
      ]),
      src: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired
    };
  }

  /**
   * Renders <Image /> component.
   *
   * @return {JSX} - renders a logo.
   */
  render() {
    const {
      className,
      src,
      title,
      alt
    } = this.props;
    return <img className = { classNames([className]) } src = { src } title = { title } alt = { alt } />; 
  }
}

export default Image;
