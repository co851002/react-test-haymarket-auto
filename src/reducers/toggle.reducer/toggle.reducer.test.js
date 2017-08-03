import toggle from './index.js';
import * as Actions from 'actionTypes';

/**
* Test for <Toggle /> hoc component.
* @test {Toggle}
*/
describe('<Toggle />', () => {

  it('should return initial state', () => {
    expect(toggle(undefined, {type: 'INIT'})).to.deep.equal({});
  });

  it('should return correct state', () => {
    const initialState = {};

    const resultState = toggle(initialState, {
      type: Actions.TOGGLE,
      compRef: 'fakeReference',
      element: 2
    });

    expect(resultState).to.deep.equal( { fakeReference: 2 } );
        
  }); 

});