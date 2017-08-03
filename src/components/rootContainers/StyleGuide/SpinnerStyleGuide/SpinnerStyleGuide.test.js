import React from 'react';
import SpinnerStyleGuide from './index';

/**
 * Test for <SpinnerStyleGuide /> root container.
 * @test {GridStyleGuide}
 */
describe('<SpinnerStyleGuide/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<SpinnerStyleGuide />);
  });

  it('renders the Spinner component', () => {
    expect(wrapper.find('Spinner')).to.have.length(3);
  });
});