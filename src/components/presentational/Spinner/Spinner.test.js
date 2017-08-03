import React from 'react';
import Spinner from 'presentational/Spinner';

const props = {
  height: 100,
  width: 100,
  src: 'source'
};

/**
* Test for <Spinner /> presentational component.
* @test {Spinner}
*/
describe('<Spinner />', () => {

  /**
  * @test render
  */
  it('should render Spinner with props supplied', () => {
    const wrapper = shallow(<Spinner { ...props } />);
    expect(wrapper).to.have.length(1);
    expect(wrapper.find('div')).to.have.length(2);
    expect(wrapper.find('div').at(1).prop('style').height).to.equal(100);
    expect(wrapper.find('div').at(1).prop('style').width).to.equal(100);
    expect(wrapper.find('Image')).to.have.length(1);
    expect(wrapper.find('Image').prop('src')).to.equal('source');
  });
});