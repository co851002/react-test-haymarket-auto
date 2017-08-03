import React from 'react';
import VoteAlert from './index';

import { render } from 'enzyme';
import { expect }  from 'chai';

/**
 * Test for <Home /> root container.
 * @test {VoteAlert}
 */
describe('<VoteAlert/>', () => {
  /**
   * Test if div is rendered in {VoteAlert}
   * @test {VoteAlert#render}
   */
  it('renders the VoteAlert component', () => {
    const wrapper = render(<VoteAlert />);
    expect(wrapper.find('div')).to.have.length(2);
  });
});
