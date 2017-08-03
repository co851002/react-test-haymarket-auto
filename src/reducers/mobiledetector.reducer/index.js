//@flow

import * as Actions from 'actionTypes';

type Action = {
  +type: string,
  +isMobile: boolean
}

/**
 * It runs the correct action received
 * @param {object} state of the application
 * @param {object} action received
 * @return {object} new object whic represent the new state after the action
 */
const isMobile = (state: boolean = true, action: Action) : boolean => {
  return action.type === Actions.SET_VIEWPORT_MOBILE ?
    action.isMobile : state;
};

export default isMobile;