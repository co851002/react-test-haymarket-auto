import React from 'react';
import LineDivider from 'presentational/LineDivider';
/**
* Test for <LineDivider /> presentational component.
* @test {LineDivider}
*/
describe('<LineDivider />', () => {

  /**
  * @test render
  */
  it('should render LineDivider', () => {
    const wrapper = shallow(<LineDivider />);
    expect(wrapper).to.have.length(1);
  });
});