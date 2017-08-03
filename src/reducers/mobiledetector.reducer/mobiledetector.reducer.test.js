import isMobile from './index';
import * as Actions from 'actionTypes';

describe('Mobile Detector', () => {
  it('should return initial state', () => {
    expect(isMobile(undefined, {type: 'INIT'})).to.deep.equal(true);
  });

  it('should update state', () => {
    const initialState = true;
    deepFreeze(initialState);
    const resultState = isMobile(initialState, {
      type: Actions.SET_VIEWPORT_MOBILE,
      isMobile: false
    });
    expect(resultState).to.be.false;
  });
});
