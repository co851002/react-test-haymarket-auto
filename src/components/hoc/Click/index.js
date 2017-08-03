// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Click HOC which add the "onClick" functionality which triggers the toggle function (typically passed in by
 * the toggle hoc).
 * @param {object} WrappedComponent - component to wrap
 * @return {object} Wrapped component with the "toggle" functionality add to it.
 */
const click = (WrappedComponent: Object) => {

  /**
   * Toggle class
   */
  return class extends Component {
    onClick: Function;
    handleDismissOnDocument: Function;
    handleEventListener: Function;
    
    /**
    *	Props implementation.
    */
    static propTypes = {
      hocOnDocumentDismiss: PropTypes.bool,
      hocSelectedId: PropTypes.number,
      hocSelectFunc: PropTypes.func.isRequired,
      dataElemId: PropTypes.number.isRequired
    }

    /**
    *	Default props.
    */
    static defaultProps = {
      hocOnDocumentDismiss: false
    };

    /**
     * Constructor funcion.
     * @param {object} props -
     * @return {void}
     */
    constructor(props: Object): void {
      super(props);
      this.onClick = this.onClick.bind(this);
      this.handleDismissOnDocument = this.handleDismissOnDocument.bind(this);
      this.handleEventListener = this.handleEventListener.bind(this);
    }

    /**
     * Add click event listener for the click only if the prop hocOnDocumentDismiss is true.
     * @return {void} 
     */
    componentDidMount(): void {
      if( this.props.hocOnDocumentDismiss ){
        window.addEventListener('click', this.handleEventListener);
      }
    }
    /**
     * It removes click event listener.
     * @return {void} 
     */
    componentWillUnmount(): void {
      if( this.props.hocOnDocumentDismiss ){
        window.removeEventListener('click', this.handleEventListener);
      }
    }

    /**
     * It toggles the state of the component to true/false.
     * - if the user clicks on the correct element (where there is onClick), the param element will
     * be present and therefore it will toggles the state and stop the propagation of handleDismissOnDocument (if is set to true).
     * because we do not need handleDismissOnDocument to run again.
     * - If handleDismissOnDocument is true and the user clicks on the document and not on the correct element, 
     * the param element will be undefined, therefore if the component's state is active, it will call onToggle
     * @param {object} element clicked
     * @return {void}
     */
    onClick(): void {
      const element = this.props.hocSelectedId === this.props.dataElemId ? null : this.props.dataElemId;
      this.props.hocSelectFunc(element);
    }

    /**
     * The purpose of this function is to have a named function (as oppose to an anonymous one) for being able to add and remove it
     * from the eventlistener. We need an additional funcion here cause we need to pass the reference as a param to it.
     * @param {object} element - clicked element
     * @return {void}
     */
    handleEventListener(element: Object): void {
      const toggleRef = this.props.hocSelectedId;
      this.handleDismissOnDocument(element, toggleRef);
    }

    /**
     * It calls to unset the state (if hocOnDocumentDismiss true) and the component's state is active and no element was selected.
     * @param {object} element - DOM element clicked
     * @param {string} toggleReference - element reference stored in the store
     * @return {void}
     */
    handleDismissOnDocument(element: Object, toggleReference: string): void {
      const target = element.target;
      const datasetParentElement = target.parentElement ? target.parentElement.dataset.elemid : null;
      const dataset = target.dataset ? target.dataset.elemid : null;
      
      if( datasetParentElement == null &&  dataset == null && toggleReference != null ){
        this.props.hocSelectFunc(null);
      }
    }

    /**
    * Render
    * @return {ReactElement} markup
    */
    render(): React.Element<*> {
      return(
        <WrappedComponent
          { ...this.props }
          handleOnClick = { this.onClick }
          dataElemId = { this.props.dataElemId } />
      );
    }
  };
};

export default click;