import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
//components
//Style
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';
//Helpers
import classNames from 'classnames';

/**
 *	Modal Header React Type component.
 */
export class ModalHeader extends PureComponent {
  /**
   *	Props implementation.
   */
  static get propTypes() {
    return{
      closeButton: PropTypes.bool,
      className: PropTypes.string,
      onHide: PropTypes.func,
      text: React.PropTypes.string
    };
  }

  /**
   * Implements defaultProps().
   */
  static get defaultProps() {
    return {
      closeButton: false
    };
  }

  /**
   * Render
   * @return {ReactElement} markup
   */
  render() {
    const closeButton = this.props.closeButton ? 
      <button className = { bootstrap.close } onClick = { this.props.onHide } type = 'button'><span>&times;</span></button>
      : null;

    return (
      <div className = { classNames([this.props.className, bootstrap.modalHeader]) }>
        { closeButton }
        <h4 className = { classNames([bootstrap.modalTitle]) }>{ this.props.text }</h4>
      </div>
    );
  }
}

export default ModalHeader;