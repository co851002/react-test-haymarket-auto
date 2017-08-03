// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

/**
 * Link that also works for external URL's
 */
export class ExternalLink extends PureComponent {
  /**
   * Implements propTypes().
   *
   * @return {Object} - prop definitions.
   */
  static propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.any,
  };
  
  /**
   * Checks if a url contains protocol. 
   * @param {string} url - a url string. 
   * @returns {bool} - is url external.
   */
  isExternalLink(url : string) : boolean {
    return (/^(http|https):\/\//.test(url));
  }

  /**
   * Renders a React Router link for internal and normal a tag for external paths.
   *
   * @returns {JSX} rendered link.
   */
  render() : React.Element<*> {
    const url = this.props.to;

    return this.isExternalLink(url) ? 
      (<a
        href = { url } >
        { this.props.children } 
      </a>) :
      <Link { ...this.props } />;
  }
}