// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
//Style
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';
// Helpers
import classNames from 'classnames';

/**
 * <Label /> component.
 */
class Label extends Component {
  /**
   * Implements propTypes().
   *
   * @return {Object} - propType object.
   * @prop {string} className - class name for logo.
   */
  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.array
    ])
  };

  /**
   * Renders <Logo /> component.
   *
   * @return {JSX} - renders a label.
   */
  render() : React.Element<*> | null {
    if (!this.props.children) {
      return null;
    }
    const props = Object.assign({}, this.props);
    props.className = classNames([props.className, bootstrap.label]);
    return (<div { ...props } >
      { this.props.children }
    </div>);
  }
}

export default Label;