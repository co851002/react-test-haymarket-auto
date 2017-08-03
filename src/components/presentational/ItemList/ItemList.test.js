import React from 'react';
import ItemList from './index';
import Item from 'presentational/Item';
import Icon from 'presentational/Icon';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
const initialState = {toggle: {'testRef': null}};


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
  type: 'fakemenu',
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
  type: 'fakemenu',
  weight: 12
}    
];
const props = {
  menuItemClasses: {
    activeClass: 'active',
    hasChildrenClass: 'dropdown',
    openClass: 'open'
  },
  navClasses: {
    nav: 'nav',
    children: 'dropdownMenu',
    hasChildren: 'dropdown'
  }
};

describe('<ItemList />', () => {
  it('should render a ul list by default', () => {
    const wrapper = shallow(<ItemList items = { items } />);
    expect(wrapper.is('ul')).to.be.true;
  });

  it('should render a ol list if property is set', () => {
    const wrapper = shallow(<ItemList type = "ol" items = { items } />);
    expect(wrapper.is('ol')).to.be.true;
  });

  it('should render the  correct number of Item components', () => {
    const wrapper = shallow(<ItemList items = { items } />);
    expect(wrapper.find(Item).length).to.equal(2);
  });  

  it('should render 2 Item children', () => {
    const wrapper = shallow(<ItemList items = { items } { ...props } />);
    expect(wrapper.find(Item).length).to.equal(2);
  });

  it('should not render anything if no items set', () => {
    const wrapper = shallow(<ItemList />);
    expect(wrapper.is('ul')).to.be.false;
  });

  it('should render a connected ToggleItem and it also should have a reference for the toggle', () => {
    
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store = { store } >
        <ItemList items = { items } { ...props } toggleRef = 'testRef' />
      </Provider>
    );

    expect(wrapper.find('Connect(Toggle)')).to.have.length(1); //dropdown father
    expect(wrapper.find(Item).first().prop('reference')).to.equal('testRef');    
  });

  it('should apply itemListClass correctly', () => {
    const wrapper = shallow(<ItemList items = { items } itemListClass = { props.navClasses.nav } />);
    expect(wrapper.find('ul').prop('className')).to.equal(props.navClasses.nav);
  });

  it('should render the correct icon for element with children', () => {

    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store = { store } >
        <ItemList items = { items } { ...props } toggleRef = 'testRef' />
      </Provider>
    );    

    expect(wrapper.find(Icon).at(0).prop('position')).to.equal('r');
    expect(wrapper.find(Icon).at(0).prop('element')).to.equal(items[0].text);
  });

  it('should render the correct icons if elements have any', () => {

    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store = { store } >
        <ItemList items = { items } { ...props } toggleRef = 'testRef' />
      </Provider>
    );    

    expect(wrapper.find(Icon).at(1).prop('position')).to.equal(items[1].icon.position);
    expect(wrapper.find(Icon).at(1).prop('iconName')).to.equal(items[1].icon.code);
    expect(wrapper.find(Icon).at(1).prop('element')).to.equal(items[1].text);
  });

});