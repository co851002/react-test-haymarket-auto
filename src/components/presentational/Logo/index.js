// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
// Components
import RetinaImage from 'react-retina-image';
import { Link } from 'react-router';
// Images
import img from './img/logo.png';
import img2x from './img/logo@2x.png';
/**
 * <Logo /> component.
 */
class Logo extends Component {
  /**
   * Implements propTypes().
   *
   * @return {Object} - propType object.
   * @prop {string} className - class name for logo.
   * @prop {string} href - link for logo. If set will wrap logo in a link.
   * @prop {string} title - title attribute.
   * @prop {string} alt - alt attribute for logo.
   */
  static propTypes = {
    className: PropTypes.string,
    href: PropTypes.string,
    title: PropTypes.string,
    alt: PropTypes.string
  };

  /**
   * Renders <Logo /> component.
   *
   * @return {JSX} - renders a logo.
   */
  render() : React.Element<*> {
    const props = this.props;
    let result = <RetinaImage className = { !props.href ? props.className : null } src = { [img, img2x] } title = { props.title } alt = { props.alt } />;
    if ( props.href ) {
      result = <Link className = { props.className } to = { props.href }>{ result }</Link>;
    }
    return result;
  }
}

export default Logo;
