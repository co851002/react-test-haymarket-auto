// @flow 

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
  *	LineDivider React Type component.
  */
export class LineDivider extends PureComponent {
/**
  *	Props implementation.
  */
  static propTypes = {
    class: PropTypes.string
  };

  /**
  * Render
  * @return {ReactElement} markup
  */
  render()  : React.Element<*> {
    return (
      <hr className = { this.props.class } />
    );
  }
}

export default LineDivider;