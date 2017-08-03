// @flow

import * as Actions from 'actionTypes';

type Action = {
  +type: string,
  +result: {}
}

const props = function(state: Object = {}, action: Action) : Object {
  if (action.type == Actions.APPLY_PROPS) {
    return Object.assign({}, state, action.result);
  }
  return state;
};

export default props;
