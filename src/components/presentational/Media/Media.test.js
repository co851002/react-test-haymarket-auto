import React from 'react';
import Media from 'presentational/Media';

//Style
import helpers from 'shared/helpers.scss';
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';
//components
import PrintHtml from 'presentational/PrintHtml';
/**
* Test for <Media /> presentational component.
* @test {Media}
*/
describe('<Media />', () => {

  /**
  * @test render
  */
  it('should render Media', () => {
    const wrapper = shallow(<Media />);
    expect(wrapper).to.have.length(1);
  });

  /**
  * @test render have PrintHtml component
  */
  it('should have 2 PrintHtml component', () => {
    const wrapper = shallow(<Media />);
    expect(wrapper.find(PrintHtml)).to.have.length(2);
  });

  /**
  * @test render haveh5 tag
  */
  it('should have 2 PrintHtml component', () => {
    const wrapper = shallow(<Media />);
    expect(wrapper.find('h5')).to.have.length(1);
  });

  /**
  * @test render have bootstrap class media
  */
  it('should have class media', () => {
    const wrapper = shallow(<Media />);
    expect(wrapper.hasClass(bootstrap.media)).to.be.true;
  });

  /**
  * @test render if image is not provided, show the placeholder
  */
  it('should render the placeholder if an image is not provided', () => {
    const wrapper = shallow(<Media />);
    expect(wrapper.find(`.${bootstrap.mediaObject}`)).to.have.length(1);
    expect(wrapper.find(`.${helpers.userPlaceholder}`)).to.have.length(1);
  });

  /**
  * @test render if image is provided, should be visible
  */
  it('should render the image if provided (TO DO: FIX THIS TEST WHEN THE RIGHT COMPONENT WILL BE IMPLEMENTED)', () => {
    const wrapper = render(<Media mediaImage = { 'retinaComponent or imageComponent?' } />);
    expect(wrapper.text()).to.contain('retinaComponent or imageComponent?');
  });


});