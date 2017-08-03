import React from 'react';
import PagerStyleGuide from './index';
import PagerItem from './PagerItem';

/**
 * Test for <PagerStyleGuide /> root container.
 * @test {PagerStyleGuide}
 */
describe('<PagerStyleGuide/>', () => {
  let pagerStyleGuide;
  let pagerItem;

  beforeEach(() => {
    pagerStyleGuide = shallow(<PagerStyleGuide />);
    pagerItem = shallow(<PagerItem />);
  });

  /**
   * @test {Pager#render}
   */
  it('should have a title and subtitle', () => {
    expect(pagerStyleGuide.find('h1')).to.have.length(1);
    expect(pagerStyleGuide.find('h4')).to.have.length(1);
  });

  /**
   * @test {Pager#render}
   */
  it('renders the Pager component', () => {
    expect(pagerStyleGuide.find('PagerItem')).to.have.length(6);
  });

  describe('<PagerItem/>', () => {
    /**
     * @test {Pager#render}
     */
    it('should set a new state when gotoPage is called', () => {
      const page = 10;
      pagerItem.instance().gotoPage(page);
    
      expect(pagerItem.state().current).to.equal(10);
    });
  });  
});
