//@flow

import * as Actions from 'actionTypes';

type Action = {
  +type: string,
  +eventType: string,
  +compName: string,
  +target: mixed
}

/**
 * It runs the correct action received
 * @param {object} state of the application
 * @param {object} action received
 * @return {object} new object which represent the new state after the action
 */
const eventsListener = (state : null | Object = null, action : Action) : Object | null => {
  if(action && action.type === Actions.ADD_EVENTS_LISTENER){
    const newState = Object.assign({}, state);

    if(!newState[action.eventType]){//the eventType doesn't exist yet
      newState[action.eventType] = {};
    }

    if(!newState[action.eventType][action.compName]){//the eventType exists, but the compName doesn't yet
      newState[action.eventType][action.compName] = {
      };
    }

    if(!newState[action.eventType][action.compName][action.target]){
      //Ready to push new targets
      newState[action.eventType][action.compName][action.target] = 0;
    }

    // increment the reference count
    newState[action.eventType][action.compName][action.target]++;
    
    return newState;
  }
  else if (action && action.type === Actions.REMOVE_EVENTS_LISTENER
      && state 
      && state[action.eventType] 
      && state[action.eventType][action.compName] 
      && state[action.eventType][action.compName][action.target]) {
    const newState = Object.assign({}, state);
    const eventLength = Object.keys(newState).length;
    const compnameLength = Object.keys(newState[action.eventType]).length;
    const targetLength = Object.keys(newState[action.eventType][action.compName]).length;
    const referenceCount = newState[action.eventType][action.compName][action.target];

    // returns null if we only have the one event/compname/target and single reference then 
    // empty the store
    if (eventLength === 1 && compnameLength === 1 && targetLength === 1 && referenceCount === 1) {
      return null;
    }
    
    // if there's only the one compname/target pair and single reference for this event then delete the 
    // whole event
    if (compnameLength === 1 && targetLength === 1 && referenceCount === 1) {
      delete newState[action.eventType];
      return newState;
    }

    // if there's only one target and single reference then delete the whole compname
    if (targetLength === 1 && referenceCount === 1) {
      delete newState[action.eventType][action.compName];      
      return newState;
    }

    // if the reference count is greater than 1 then decrement it
    if (referenceCount > 1) {
      newState[action.eventType][action.compName][action.target]--;
      return newState;
    }

    // otherwise remove the specific entry from the target array
    //const targetIndex = newState[action.eventType][action.compName].targets.indexOf(action.target);
    delete newState[action.eventType][action.compName][action.target];
    return newState;
  }

  return state;
};

export default eventsListener;