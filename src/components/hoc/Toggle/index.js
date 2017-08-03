// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//components
import { connect } from 'react-redux';
import { getDisplayName } from 'recompose';
import EventsHandler from 'containers/EventsHandler';

//Actions
import * as Actions from 'actionTypes';

let Toggle;

/**
 * Toggle HOC which add the "toggle" functionality which keeps track of the change of state of an element.
 * @param {object} WrappedComponent - component to wrap
 * @param {string} reference - id of the current element. This is useful to identify the element in the store.
 * @return {object} Wrapped component with the "toggle" functionality add to it.
 */
const toggle = (WrappedComponent: Object, reference: string) => {
  /**
   * Toggle class
   */
  Toggle = class extends Component {
    
    /**
    *	Props implementation.
    */
    static propTypes = {
      toggleOnDocument: PropTypes.bool,
      dataset: PropTypes.string,
      injectedElemId: PropTypes.number,
      dispatch: PropTypes.func,
      toggle: PropTypes.object,
      toggleClass: PropTypes.string,
      eventType: PropTypes.string,
      eventTarget: PropTypes.oneOf([
        PropTypes.string,
        PropTypes.element,
        PropTypes.object
      ]),
      eventCallback: PropTypes.func
    };

    /**
    *	Default props.
    */
    static defaultProps = {
      toggleOnDocument: false,
      eventType: 'click'
    };

    /**
     * It dispatches the TOGGLE action
     * @param {number | null} element - element'id clicked
     * @return {void}
     */

    dispatchToggleEvent = (element: number | null): void => {
      this.props.dispatch({
        type: Actions.TOGGLE,
        compRef: reference,
        element: element
      });
    }

    /**
     * The purpose of this function is to have a named function (as oppose to an anonymous one) for being able to add and remove it
     * from the eventlistener. We need an additional funcion here cause we need to pass the reference as a param to it.
     * @param {object} element - clicked element
     * @return {void}
     */
    handleEventsListener = (element: Object): void => {
      const toggleRef = this.props.toggle[reference];
      this.handleToggleOnDocument(element, toggleRef);
    }
    /**
     * It calls onToggle to toggle the state only if handleToggleOnDocument is true and the component's state is active.
     * @param {object} element - DOM element clicked
     * @param {string} toggleReference - element reference stored in the store
     * @return {void}
     */
    handleToggleOnDocument = (element: Object, toggleReference: string): null | void => {

      if(!element){
        return null;
      }

      const target = element.target;
      const datasetParentElement = target.parentElement ? target.parentElement.dataset.elemid : null;
      const dataset = target.dataset ? target.dataset.elemid : null;
      
      if( datasetParentElement == null && dataset == null && toggleReference != null ){
        this.dispatchToggleEvent(null);
      }
    }
    
    /**
    * Render
    * @return {ReactElement} markup
    */
    render() : React.Element<*> | null {
      const {
        toggle,
        injectedElemId,
        toggleClass,
        eventType,
        eventTarget,
        eventCallback
      } = this.props;

      return(
        <WrappedComponent
          { ...this.props }
          reference = { reference } //item/menu reference to keep into the store
          hocSelectFunc = { this.dispatchToggleEvent }
          hocSelectedId = { this.props.toggle[reference] }
          toggleClass = { toggle[reference] === injectedElemId && toggle[reference] != null ? toggleClass : '' }
          dataElemId = { injectedElemId } >
          {
            this.props.toggleOnDocument ?
              <EventsHandler
                compName = { getDisplayName(WrappedComponent) }
                eventType = { eventType }
                target = { eventTarget }
                onHandleEventsListener = { eventCallback ? eventCallback : this.handleEventsListener } />             
            : null
          }
        </WrappedComponent>
      );
    }
  };

  /**
   * It map the state to props
   * @param {object} state - current app state
   * @return {object} - state of the toggle array
   */
  const mapStateToProps = (state: Object) : Object => {
    return {
      toggle: state.toggle
    };
  };
  
  return connect(mapStateToProps, null, null, { pure: false })(Toggle);

};

export default toggle;
export { Toggle };
