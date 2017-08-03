// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
//components
import { connect } from 'react-redux';
//Actions
import * as Actions from 'actionTypes';


/**
 * EventsHandler class
 */
export class EventsHandler extends PureComponent {
  /**
  *	Props implementation.
  */
  static propTypes = {
    dispatch: PropTypes.func,
    target: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.object
    ]),
    compName: PropTypes.string.isRequired,
    eventsListener: PropTypes.object,
    eventType: PropTypes.string,
    onHandleEventsListener: PropTypes.func
  };

  /**
  *	Default props.
  */
  static defaultProps = {
    eventType: 'click'
  };

  /**
   * It map the state to props
   * @param {object} state - current app state
   * @return {object} - state of the eventsListener object
   */
  static mapStateToProps = (state : Object) : {} => {
    return {
      eventsListener: state.eventsListener
    };
  };  

  /**
   * It checks if in the store there is already a reference of:
   * - an event this.props.eventType
   * - an event this.props.eventType for the component this.props.compName
   * - an event this.props.eventType for the component this.props.compName to the target this.props.target
   * if there is none, it will dispatchEvent
   * @return {void} 
   */
  componentDidMount() {
    const {
      eventsListener,
      eventType,
      onHandleEventsListener,
      compName
    } = this.props;

    const target = this.getTarget();
    
    // If we haven't added this event/compname/target before then need to add the listener
    if(eventsListener == null 
      || eventsListener[eventType] == null 
      || eventsListener[eventType][compName] == null 
      || eventsListener[eventType][compName][target.toString()] == null){     
      target.addEventListener(eventType, onHandleEventsListener );
    }

    this.dispatchEvent(Actions.ADD_EVENTS_LISTENER);
  }
  /**
   * It removes event listener.
   * @return {void} 
   */
  componentWillUnmount() {
    const {
      eventType,
      onHandleEventsListener,
      eventsListener,
      compName
    } = this.props;

    const target = this.getTarget();

    // if there is no longer anything for the given event/compname/target then it's time to remove the listener
    if(eventsListener && eventsListener[eventType] && eventsListener[eventType][compName] 
        && eventsListener[eventType][compName][target.toString()]
        && eventsListener[eventType][compName][target.toString()] === 1) {
      target.removeEventListener(eventType, onHandleEventsListener );
    }

    this.dispatchEvent(Actions.REMOVE_EVENTS_LISTENER);
  }

  /**
   * Because of server side rendering, we can't default target to window in the static defaultProps object.
   * Instead we need this function to return the target if specified else default to window
   * @todo invesitgate the right way we want to handle server side rendering involving window/document type targets
   * @return {element} the target  
   */
  getTarget = () => {
    if (!this.props.target) {
      return window;
    }

    return this.props.target;
  }

  /**
   * It dispathes the add/remove event and it appends the type event on the target element
   * @param {string} actionType - the action to send out 
   * @return {void}
   */
  dispatchEvent(actionType){
    const {
      eventType,
      compName,
      dispatch
    } = this.props;

    const target = this.getTarget();

    dispatch({
      type: actionType,
      eventType: eventType,
      compName:  compName,
      target: target.toString()
    });    
  }

  /**
  * Render
  * @return {ReactElement} markup
  */
  render() : React.Element<*> | null {
    return(
      null
    );
  }
}
  
export default connect(EventsHandler.mapStateToProps)(EventsHandler);