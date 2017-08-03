import React from 'react';
import Menu from 'presentational/Menu';
import ItemList from 'presentational/ItemList';

//Style
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';

const items = [{
  active: false,
  children: [
    {
      active: false,
      children: [],
      elemId: 2,
      parent: 0,
      path: '/fakepath2',
      text: 'fake2',
      type: 'fakemenu',
      weight: 90
    },
    {
      active: false,
      children: [],
      elemId: 3,
      parent: 0,
      path: '/fakepath3',
      text: 'fake3',
      type: 'fakemenu',
      weight: 91
    }
  ],
  elemId: 1,
  parent: 0,
  path: '/fakepath1',
  text: 'fake1',
  type: 'fakemenu',
  weight: 10
},
{
  active: false,
  children: [],
  elemId: 4,
  parent: 0,
  path: '/fakepath4',
  text: 'fake4',
  type: 'fakemenu2',
  weight: 11,
  icon: {
    code: '4',
    position: 'left'
  },
},
{
  active: false,
  children: [],
  elemId: 5,
  parent: 0,
  path: '/fakepath5',
  text: 'fake5',
  type: 'fakemenu2',
  weight: 12
}    
];

const props = {
  items: items,
  navClasses:  {
    nav: 'classNav',
    children: 'classChildren'
  },
  menuItemClasses:{
    activeClass: 'active'
  }
};

/**
* Test for <Menu /> presentational component.
* @test {Menu}
*/
describe('<Menu />', () => {

  it('should render Menu', () => {
    const wrapper = shallow(<Menu { ...props } />);
    expect(wrapper).to.have.length(1);
  });

  it('should not render Menu if items are not provided', () => {
    const wrapper = shallow(<Menu />);
    expect(wrapper.find('ul')).to.have.length(0);
  });

  it('should have props', () => {
    const wrapper = shallow(<Menu { ...props } />);
    expect(wrapper.find(ItemList).prop('itemListClass')).to.equal('classNav');
    expect(wrapper.find(ItemList).prop('childrenClass')).to.equal('classChildren');
    expect(wrapper.find(ItemList).prop('activeClass')).to.equal('active');
    expect(wrapper.find(ItemList).prop('toggleClass')).to.equal(bootstrap.open);
  });

});