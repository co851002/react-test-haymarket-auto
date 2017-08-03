import React from 'react';
import RatingStyleGuide from './index';

/**
 * Test for <RatingStyleGuide /> root container.
 * @test {RatingStyleGuide}
 */
describe('<RatingStyleGuide/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<RatingStyleGuide />);
  });

  /**
   * Test if div is rendered in {Row}
   * @test {Row#render}
   */
  it('renders the Rating components', () => {
    expect(wrapper.find('Rating')).to.have.length(6);
  });
});
