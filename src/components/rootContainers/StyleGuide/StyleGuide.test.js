import React from 'react';
import StyleGuide from './index';

/**
 * Test for <StyleGuide /> root container.
 * @test {StyleGuide}
 */
describe('<StyleGuide/>', () => {
  /**
   * Test if GridStyleGuide is rendered in {GridStyleGuide}
   * @test {GridStyleGuide#render}
   */
  it('renders the StyleGuide components', () => {
    const wrapper = shallow(<StyleGuide />);
    expect(wrapper.find('SelectStyleGuide')).to.have.length(1);
    expect(wrapper.find('PagerStyleGuide')).to.have.length(1);
    expect(wrapper.find('ButtonGroupStyleGuide')).to.have.length(1);
    expect(wrapper.find('RatingStyleGuide')).to.have.length(1);
    expect(wrapper.find('GridStyleGuide')).to.have.length(1);
    expect(wrapper.find('ImageStyleGuide')).to.have.length(1);
    expect(wrapper.find('SpinnerStyleGuide')).to.have.length(1);
    expect(wrapper.find('ModalStyleGuide')).to.have.length(1); 
  });

  /**
   * Test if AlertStyleGuide is rendered in {AlertStyleGuide}
   * @test {AlertStyleGuide#render}
   */
  it('renders the AlertStyleGuide component', () => {
    const wrapper = shallow(<StyleGuide />);
    expect(wrapper.find('AlertStyleGuide')).to.have.length(1);
  });
});
