import React, { Component } from 'react';
import Modal from 'presentational/Modal';
import ModalHeader from 'presentational/Modal/ModalHeader';
import ModalBody from 'presentational/Modal/ModalBody';
import ModalFooter from 'presentational/Modal/ModalFooter';
//Components
import Button from 'presentational/Button';
//Style
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';
//Helpers
import classNames from 'classnames';


/**
 * <ModalStyleGuide /> component.
 */
class ModalStyleGuide extends Component {
  /**
   * Constructor funcion. 
   * @param {object} props -
   */
  constructor(props) {
    super(props);
    this.state = {
      show: {}
    };
  }

  /**
   * Set the modal show state to true. 
   * @param {string} key - to identify the individual modal
   * @returns {void}
   */
  showModal = (key) => {
    const obj = {};
    obj[key] = true;
    this.setState({ show: obj });
  }

  /**
   * Resets modal show state.
   * @param {string} key - to identify the individual modal
   * @returns {void}
   */
  hideModal = (key) => {
    const obj = {};
    obj[key] = false;
    this.setState({ show: obj });
  }

  /**
   * Returns the jsx for a button and modal.
   * @param {string} description - string to display alongside the button
   * @param {string} key - to identify the individual modal
   * @param {string} headerText - the text to display in the header
   * @param {string} bodyText - the text to display in the body
   * @param {string} closeButton - flag if you want the close icon in the header
   * @param {string} closeOnWindowClick - flag if you want to close on a window click outside the dialog
   * @param {string} closeOnWindowEscKey - flag if you want to close on an ESC key press
   * @returns {jsx} - the jsx to render
   */
  modal = (description,
    key,
    headerText,
    bodyText,
    closeButton = true, 
    closeOnWindowClick = false,
    closeOnWindowEscKey = false) => {
    return (
      <div>
        {description}
        {'\u00A0'}
        <Button 
          handleOnClick = { () => (this.showModal(key)) }
          buttonText = 'Open' 
          buttonClass = { classNames([bootstrap.btn, bootstrap.btnPrimary]) } />
        <Modal show = { this.state.show[key] } 
          onHide = { () => (this.hideModal(key)) } 
          closeOnWindowClick = { closeOnWindowClick } 
          closeOnWindowEscKey = { closeOnWindowEscKey } >
          <ModalHeader text = { headerText } closeButton = { closeButton } />
          <ModalBody>{ bodyText }</ModalBody>
          <ModalFooter>
            <Button handleOnClick = { () => (this.hideModal(key)) } buttonClass = { classNames([bootstrap.btn, bootstrap.btnWarning]) } buttonText = 'Close' />
            <Button handleOnClick = { () => (this.hideModal(key)) } buttonClass = { classNames([bootstrap.btn, bootstrap.btnPrimary]) } buttonText = 'Save changes' />
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  /**
   * Renders the ModalStyleGuide component.
   *
   * @return {JSX} - rendered ModalStyleGuide page.
   */
  render() {
    const modalDefault = this.modal('Close button in header:', 'default', 'Default Modal', 'You can close via the button in the header or via the buttons in the footer');
    const modalNoClose = this.modal('No close button in header:', 'noclose', 'closeButton prop in header is false', 'You can only close via the buttons in the footer', false);
    const modalOutside = this.modal('Close with click outside modal:', 'outside', 'closeOnWindowClick = true', 'You can close by clicking outside of the modal',false, true, false);
    const modalEscape = this.modal('Close with Escape keypress:', 'escape', 'closeOnWindowEscKey = true', 'You can close by pressing the Escape button',false, false, true);

    return (
      <div className = { classNames([bootstrap.modalOpen]) }>
        <h1>Modal</h1> 
        { modalDefault }
        <br />
        { modalNoClose }
        <br />
        { modalOutside }
        <br />
        { modalEscape }
      </div>
    );
  }
}

export default ModalStyleGuide;