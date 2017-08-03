import React, {Component} from 'react';
import PropTypes from 'prop-types';
//Style
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';
// Helpers
import classNames from 'classnames';
import hayPropTypes from 'hayPropTypes';

/**
 * <ButtonGroup /> component.
 */
export class ButtonGroup extends Component {
  /**
   * Implements propTypes().
   */
  static get propTypes() {
    return {
      className: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
      ]),
      size: PropTypes.oneOf(['sm', 'lg']),
      children: hayPropTypes.childrenOfTypes('Button'),
      vertical: PropTypes.bool
    };
  }
  
  /**
   * Renders <Button /> component.
   *
   * @return {JSX} - renders a ButtonGroup.
   */
  render() {
    const {
      className,
      children,
      vertical,
      size
    } = this.props;

    if (!children) {
      return null;
    }

    const groupTypeClass = vertical ? bootstrap.btnGroupVertical : bootstrap.btnGroup;
    const sizeClass = size ? bootstrap[`btn-group-${size}`] : null;

    return ( 
      <div className = { classNames([groupTypeClass, sizeClass, className]) } >
        {children}  
      </div>
    );
  }
}

export default ButtonGroup;