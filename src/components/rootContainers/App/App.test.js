import React from 'react';

import App from './index.js';
import Header from 'containers/Header';
import Footer from 'containers/Footer';
import { shallow } from 'enzyme';
import { expect }  from 'chai';

/**
 * Test for <App /> root container.
 * @test {App}
 */
describe('<App />', () => {
  /**
   * Test for App#render.
   * @test {App#render}
   */
  it('renders App', () => {
    const app = shallow(<App />);
    expect(app).to.have.length(1);
  });

  /**
   * Test if {Header} is rendered in {App}
   * @test {App#render}
   */
  it('has a header', () => {
    const app = shallow(<App />);
    expect(app.find(Header)).to.have.length(1);
  });

  /**
   * Test if {Footer} is rendered in {App}
   * @test {App#render}
   */
  it('has a footer', () => {
    const app = shallow(<App />);
    expect(app.find(Footer)).to.have.length(1);
  });

});
