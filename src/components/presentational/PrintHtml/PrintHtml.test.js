import React from 'react';
import PrintHtml from 'presentational/PrintHtml';
/**
* Test for <PrintHtml /> presentational component.
* @test {PrintHtml}
*/
describe('<PrintHtml />', () => {

  /**
  * @test 
  */
  it('should render PrintHtml', () => {
    const wrapper = shallow(<PrintHtml text = { '<p>test</p>' } />);
    expect(wrapper).to.have.length(1);
  });

  /**
  * @test render
  */
  it('shouldn\'t render PrintHtml if text is not provided ', () => {
    const wrapper = shallow(<PrintHtml />);
    expect(wrapper.find('div')).to.have.length(0);
  });
});