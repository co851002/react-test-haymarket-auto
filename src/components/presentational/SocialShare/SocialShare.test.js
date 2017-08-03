import React from 'react';
import SocialShare from './index';

describe('<SocialShare />', () => {
  const props = {
    types: ['tw'],
    text: 'text',
    link: 'link',
    fbAppId: 1234
  };

  it('should render a social share with props', () => {
    const wrapper = shallow(<SocialShare { ...props } />);
    expect(wrapper.find('ButtonGroup')).to.have.length(1);
    expect(wrapper.find('Button')).to.have.length(1);
    expect(wrapper.find('Button').prop('href')).to.equal('https://twitter.com/intent/tweet?text=text: link');
    expect(wrapper.find('Icon')).to.have.length(1);
  });

  it('should render all links by default', () => {
    const wrapper = shallow(<SocialShare link = 'test' />);
    expect(wrapper.find('ButtonGroup')).to.have.length(1);
    expect(wrapper.find('Button')).to.have.length(2);
    expect(wrapper.find('Icon')).to.have.length(2);
  });
});
