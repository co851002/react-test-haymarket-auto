import React from 'react';
import PagerStyleGuide from './index';

/**
 * Test for <PagerStyleGuide /> root container.
 * @test {PagerStyleGuide}
 */
describe('<PagerStyleGuide/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PagerStyleGuide />);
  });

  /**
   * @test {Pager#render}
   */
  it('should have a title and subtitle', () => {
    expect(wrapper.find('h1')).to.have.length(1);
    expect(wrapper.find('h4')).to.have.length(1);
  });

  /**
   * @test {Pager#render}
   */
  it('renders the Pager component', () => {
    expect(wrapper.find('ButtonGroup')).to.have.length(5);
  });
});
