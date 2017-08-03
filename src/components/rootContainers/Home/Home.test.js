import React from 'react';
import Home from './index';

import { render } from 'enzyme';
import { expect }  from 'chai';

/**
 * Test for <Home /> root container.
 * @test {Home}
 */
describe('<Home/>', () => {
  /**
   * Test if div is rendered in {Home}
   * @test {Home#render}
   */
  it('renders the Home component', () => {
    const wrapper = render(<Home />);
    expect(wrapper.find('div')).to.have.length(1);
  });
});


