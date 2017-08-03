import props from './index';
import * as Actions from 'actionTypes';

describe('props reducer', () => {
  it('should return initial state', () => {
    expect(props(undefined, {type: 'INIT'})).to.deep.equal({});
  });

  it('should APPLY_PROPS to the state', () => {
    const initialState = {};
    deepFreeze(initialState);
    const expectedState = {
      'prop1': 'Prop 1',
      'prop2': 'Prop 2'
    };
    const resultState = props(initialState, {
      type: Actions.APPLY_PROPS,
      result: expectedState
    });
    expect(resultState).to.deep.equal(expectedState);
  });

  it('should APPLY_PROPS and replace same props', () => {
    const initialState = {
      'prop1': 'Prop 1'
    };
    deepFreeze(initialState);
    const expectedState = {
      'prop1': 'Prop 2'
    };
    const resultState = props(initialState, {
      type: Actions.APPLY_PROPS,
      result: expectedState
    });
    expect(resultState).to.deep.equal(expectedState);
  });

  it('should APPLY_PROPS and replace same props and append new ones', () => {
    const initialState = {
      'prop1': 'Prop 1'
    };
    deepFreeze(initialState);
    const expectedState = {
      'prop1': 'Prop 2',
      'prop3': 'Prop 3'
    };
    const resultState = props(initialState, {
      type: Actions.APPLY_PROPS,
      result: expectedState
    });
    expect(resultState).to.deep.equal(expectedState);
  });
});
