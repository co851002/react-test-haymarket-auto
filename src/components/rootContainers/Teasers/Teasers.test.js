import React from 'react';
import Teasers from './index';

import { render } from 'enzyme';
import { expect }  from 'chai';

/**
 * Test for <Home /> root container.
 * @test {Teasers}
 */
describe('<Teasers/>', () => {
  /**
   * Test if div is rendered in {Teasers}
   * @test {Teasers#render}
   */
  it('renders the Teasers component', () => {
    const wrapper = render(<Teasers />);
    expect(wrapper.find('div')).to.have.length(35);
  });
});
