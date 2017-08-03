import React from 'react';
import GridStyleGuide from './index';

/**
 * Test for <GridStyleGuide /> root container.
 * @test {GridStyleGuide}
 */
describe('<GridStyleGuide/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<GridStyleGuide />);
  });

  /**
   * Test if GridStyleGuide has a title and subtitle
   * @test {GridStyleGuide#render}
   */
  it('Should have a <h1> title and <h4> subtitle', () => {
    expect(wrapper.find('h1')).to.have.length(1);
    expect(wrapper.find('h4')).to.have.length(1);
  });

  /**
   * Test if div is rendered in {Row}
   * @test {Row#render}
   */
  it('renders the Row components', () => {
    expect(wrapper.find('Row')).to.have.length(17);
  });

    /**
   * Test if div is rendered in {Col}
   * @test {Col#render}
   */
  it('renders the Col components', () => {
    expect(wrapper.find('Col')).to.have.length(62);
  });
});
