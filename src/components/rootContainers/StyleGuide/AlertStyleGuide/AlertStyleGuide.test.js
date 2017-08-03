import React from 'react';
import AlertStyleGuide from './index';

/**
 * Test for <AlertStyleGuide /> root container.
 * @test {AlertStyleGuide}
 */
describe('<AlertStyleGuide/>', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<AlertStyleGuide />);
  });

  /**
   * Test if there is a title and subtitle
   * @test {Alert#render}
   */
  it('Should have a <h1> title and <h4> subtitle', () => {
    expect(wrapper.find('h1')).to.have.length(1);
    expect(wrapper.find('h4')).to.have.length(1);
  });

  /**
   * Test if Alert is rendered in {AlertStyleGuide}
   * @test {AlertStyleGuide#render}
   */
  it('renders the Alert component', () => {
    expect(wrapper.find('Alert')).to.have.length(5);
  });
});
