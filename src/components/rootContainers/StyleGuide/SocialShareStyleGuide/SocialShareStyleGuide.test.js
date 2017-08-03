import React from 'react';
import SocialShareStyleGuide from './index';

/**
 * Test for <SocialShareStyleGuide /> root container.
 * @test {SocialShareStyleGuide}
 */
describe('<SocialShareStyleGuide/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SocialShareStyleGuide />);
  });

  it('renders the Social Share button components', () => {
    expect(wrapper.find('SocialShare')).to.have.length(1);
  });
});
