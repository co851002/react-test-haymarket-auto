import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
//components
import ModalHeader from './ModalHeader';
import EventsHandler from 'containers/EventsHandler';
//Style
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';
import style from 'components/Modal.scss';
//Helpers
import classNames from 'classnames';
import hayPropTypes from 'hayPropTypes';

/**
 *	Modal React Type component.
 */
export class Modal extends PureComponent {
  /**
   *	Props implementation.
   */
  static get propTypes() {
    return{
      closeOnWindowClick: PropTypes.bool,
      closeOnWindowEscKey: PropTypes.bool,
      show: PropTypes.bool,
      className: PropTypes.string,
      onHide: PropTypes.func,
      children: hayPropTypes.childrenOfTypes(['ModalHeader', 'ModalBody', 'ModalFooter'])
    };
  }

  /**
   * Implements defaultProps().
   */
  static get defaultProps() {
    return {
      closeOnWindowClick: true,
      closeOnWindowEscKey: true,
      show: false
    };
  }
  
  /**
   * Handle the clicking on the modal and decide whether to call the hide function prop.
   * As the modal takes up the whole viewport, we get a click event with the modal as a target when we 
   * click outside the dialog.  When we click within the dialog the targets are the divs within the modal
   * and so we can check against the modal div to know when clicking outside the dialog
   * @param {event} e - the click event
   * @return {void}
   */
  handleModalClick = (e) => {
    if (this.props.closeOnWindowClick && e.target === ReactDOM.findDOMNode(this.modal)) {
      this.props.onHide();
    }
  }

  /**
   * Handle the escape keypress.

   * @param {event} e - the key event
   * @return {void}
   */
  handleKey = (e) => {
    if (this.props.closeOnWindowEscKey && e.keyCode == 27) {
      this.props.onHide();
    }
  }

  /**
   * Render
   * @return {ReactElement} markup
   */
  render() {
    // Pass down the onHide prop to the ModalHeader child (if present)
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => child.type === ModalHeader ? React.cloneElement(child, {
       onHide: this.props.onHide
     }) 
     : React.cloneElement(child)
    );

    return (
      this.props.show ?
        <div className = { classNames([this.props.className]) }>
          <div className = { classNames([bootstrap.modalBackdrop]) } />
          <div ref = { (node) => this.modal = node }
            className = { classNames([style.modal, bootstrap.modal, bootstrap.fade, bootstrap.in]) } 
            onClick = { this.handleModalClick } >
            <div className = { classNames([bootstrap.modalDialog]) }>
              <div className = { classNames([bootstrap.modalContent]) }> 
                {childrenWithProps}
                <EventsHandler
                  compName = 'modal'
                  eventType = 'keydown'
                  onHandleEventsListener = { this.handleKey } />
              </div>
            </div>
          </div>
        </div>
        : null
    );
  }
}

export default Modal;