import React from 'react';
import { ExternalLink } from './index';

describe('<ExternalLink />', () => {
  it('should render a react router link if path is internal', () => {
    const wrapper = shallow(<ExternalLink to = "/internal" />);
    expect(wrapper.is('Link')).to.be.true;
  });

  it('should render a normal link if path is external', () => {
    const wrapper = shallow(<ExternalLink to = "http://www.external.com" />);
    expect(wrapper.is('Link')).to.be.false;
  });
});
