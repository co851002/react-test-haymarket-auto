import React from 'react';
import Item from 'presentational/Item';

const props = {
  dataElemId: 1,
  itemClasses: 'itemClass',
  toggleClass: 'toggleClassOpen',
  itemContent: <p>itemContent</p>,
  anchorTag: <a href = "#">anchortag <span>anchortagspan</span></a>,
  itemChildren: <ul><li>itemChildren</li></ul>
};
/**
* Test for <Item /> presentational component.
* @test {Item}
*/
describe('<Item />', () => {

  it('should render Item', () => {
    const wrapper = shallow(<Item />);
    expect(wrapper).to.have.length(1);
  });

  it('should have all the props', () => {
    const wrapper = shallow(<Item  { ...props } />);

    expect(wrapper.find('p').text()).to.equal('itemContent');
    expect(wrapper.find('p')).to.have.length(1);

    expect(wrapper.find('span').text()).to.equal('anchortagspan');
    expect(wrapper.find('span')).to.have.length(1);
    
    expect(wrapper.find('ul')).to.have.length(1);
    expect(wrapper.find('li').last().text()).to.equal('itemChildren');
    expect(wrapper.find('li')).to.have.length(2);

  });

  it('should have correct classes', () => {
    const wrapper = shallow(<Item  { ...props } />);
    expect(wrapper.find('li').first().hasClass('itemClass toggleClassOpen')).to.be.true;
  });
});