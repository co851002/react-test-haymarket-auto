import React from 'react';
import VoteButton from './index';

import { render } from 'enzyme';
import { expect }  from 'chai';

/**
 * Test for <VoteButton /> root container.
 * @test {VoteButton}
 */
describe('<VoteButton/>', () => {
  /**
   * Test if div is rendered in {VoteButton}
   * @test {VoteButton#render}
   */
  it('renders the VoteButton component', () => {
    const wrapper = render(<VoteButton />);
    expect(wrapper.find('button')).to.have.length(1);
  });
});
