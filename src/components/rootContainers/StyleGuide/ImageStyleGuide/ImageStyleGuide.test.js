import React from 'react';
import ImageStyleGuide from './index';

/**
 * Test for <ImageStyleGuide /> root container.
 * @test {GridStyleGuide}
 */
describe('<ImageStyleGuide/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ImageStyleGuide />);
  });

  it('renders the ImageStyleGuide components', () => {
    expect(wrapper.find('Image')).to.have.length(2);
  });
});