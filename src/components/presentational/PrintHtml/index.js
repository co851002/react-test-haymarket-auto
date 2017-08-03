// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
  *	PrintHtml React presentational component.
  */
export class PrintHtml extends PureComponent {
/**
  *	Props implementation.
  */
  static propTypes = {
    text: PropTypes.string,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
  };

  /**
  * React's replacement for using innerHTML in the browser DOM
  * See React's documentation https://facebook.github.io/react/docs/dom-elements.html
  * @param {html} html to be returned
  * @returns {html} It returns html
  * 
  * @memberOf PrintHtml
  */
  createMarkup(html: string) : Object {
    return { __html: html } ;
  }

  /**
  * Render
  * @return {ReactElement} markup
  */
  render() : React.Element<*> | null {
    return (
      this.props.text && this.props.text != null ? 
        <span className = { this.props.className } dangerouslySetInnerHTML = { this.createMarkup(this.props.text) } />
      :
      null
    );
  }
}

export default PrintHtml;