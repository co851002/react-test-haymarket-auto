import React from 'react';
import DateFormatter from 'presentational/DateFormatter';
import PrintHtml from 'presentational/PrintHtml';
//Fixtures
import * as fixtures from 'utils_tests/test_fixtures/fixtures';
/**
* Test for <DateFormatter /> presentational component.
* @test {DateFormatter}
*/
describe('<DateFormatter />', () => {

  /**
  * @test render
  */
  it('should render DateFormatter', () => {
    const wrapper = shallow(<DateFormatter date = { '' } />);
    expect(wrapper.find('span')).to.have.length(0);
  });

  /**
  * @test render
  */
  it('shouldn\'t render if no date provided', () => {
    const wrapper = shallow(<DateFormatter date = { fixtures.ARTICLE.articleDate } />);
    expect(wrapper.find('span')).to.have.length(1);
  });

  /**
  * @test render
  */
  it('should have PrintHtml component', () => {
    const wrapper = shallow(<DateFormatter date = { fixtures.ARTICLE.articleDate } />);
    expect(wrapper.find(PrintHtml)).to.have.length(1);
  });

  /**
  * @test render the right default value if date is a string
  */
  it('should print the right date with the default value', () => {
    const wrapper = render(<DateFormatter date = { fixtures.ARTICLE.articleDate } />);
    expect(wrapper.text()).to.contain('8 Mar 2017 16:19');
  });

  /**
  * @test render the right default value if date is a number
  */
  it('should print the right date with the default value', () => {
    const wrapper = render(<DateFormatter date = { fixtures.ARTICLE.lastUpdatedDate } />);
    expect(wrapper.text()).to.contain('8 Mar 2017 16:19');
  });

  /**
  * @test render the right default value if wrong format prop provided
  */
  it('should print the default date format if the format prop provided is not recognise', () => {
    const wrapper = render(<DateFormatter date = { fixtures.ARTICLE.articleDate } format = { 'wrong format whatever' } />);
    expect(wrapper.text()).to.contain('8 Mar 2017 16:19');
  });


});