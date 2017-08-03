import React from 'react';
import InputGroupStyleGuide from './index';
import InputGroup from 'presentational/InputGroup';

/**
 * Test for <InputGroupStyleGuide /> root container.
 * @test {InputGroupStyleGuide}
 */
describe('<InputGroupStyleGuide/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<InputGroupStyleGuide />);
  });

  /**
   * Test if InputGroupStyleGuide has a title and subtitle
   * @test {InputGroupStyleGuide#render}
   */
  it('Should have a <h1> title and <h4> subtitle', () => {
    expect(wrapper.find('h1')).to.have.length(1);
    expect(wrapper.find('h4')).to.have.length(1);
  });

  /**
   * Test if InputGroup examples are rendered
   * @test {InputGroupStyleGuide#render}
   */
  it('renders 10 input group examples', () => {
    expect(wrapper.find(InputGroup)).to.have.length(11);
  });
});
