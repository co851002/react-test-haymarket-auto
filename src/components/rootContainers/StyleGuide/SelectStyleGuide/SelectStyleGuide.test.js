import React from 'react';
import SelectStyleGuide from './index';

/**
 * Test for <GridStyleGuide /> root container.
 * @test {GridStyleGuide}
 */
describe('<SelectStyleGuide/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SelectStyleGuide />);
  });

  /**
   * Test if {Select} is rendered
   * @test {Select#render}
   */
  it('renders the Select components', () => {
    expect(wrapper.find('Select')).to.have.length(3);
  });
});
