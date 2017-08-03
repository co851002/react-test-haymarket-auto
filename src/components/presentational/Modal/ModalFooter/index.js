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
export class ModalFooter extends PureComponent {
  /**
   *	Props implementation.
   */
  static get propTypes() {
    return{
      className: PropTypes.string,
      children: PropTypes.any
    };
  }

  /**
   * Render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <div className = { classNames([this.props.className, bootstrap.modalFooter]) } >
        { this.props.children }
      </div>
    );
  }
}

export default ModalFooter;