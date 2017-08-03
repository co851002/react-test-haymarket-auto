import React from 'react';
import Image from 'presentational/Image';

/**
* Test for <Image /> ComponentType component.
* @test {Image}
*/

const props = {
  src: 'something.svg',
  title: 'a title',
  alt: 'alt',
  className: 'class'
};

describe('<Image />', () => {

  it('should render with props', () => {
    const wrapper = shallow(<Image { ...props } />);
    expect(wrapper.find('img').prop('src')).to.equal('something.svg');
    expect(wrapper.find('img').prop('title')).to.equal('a title');
    expect(wrapper.find('img').prop('alt')).to.equal('alt');
    expect(wrapper.find('img').prop('className')).to.equal('class');
  });

});