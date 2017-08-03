// @flow

import * as Actions from 'actionTypes';

type Action = {
  +type: string,
  +compRef: string,
  +element: number
}

/**
 * It runs the correct action received
 * @param {object} state of the application
 * @param {object} action received
 * @return {object} new object whic represent the new state after the action
 */
const toggle = (state: Object = {}, action: Action) : Object => {
  if(action.type === Actions.TOGGLE){
    const newState = Object.assign({}, state);
    newState[action.compRef] = action.element;

    return newState;
  }

  return state;
};

export default toggle;