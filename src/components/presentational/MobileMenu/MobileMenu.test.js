import React from 'react';
//components
import ConnectedMobileMenu, { MobileMenu } from './index';
import Button from 'presentational/Button';
import { MenuContainer } from 'containers/MenuContainer';
import ItemList from 'presentational/ItemList';
import Item from 'presentational/Item';
//Utils 
import flatten from 'utils_functions/flatten';

import style from 'components/MainMenu.scss';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const initialState = { toggle: { 'fakeMenuName': null } };
const mockStore = configureStore([]);

const store = mockStore(initialState);

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
  menuName: 'fakeMenuName',
  toggle: initialState.toggle,
  navClasses:  {
    nav: 'classNav',
    children: 'classChildren'
  },
  menuItemClasses:{
    activeClass: 'active'
  }
};

const menuContainer = shallow(<MenuContainer { ...props } />);
const flattenItems = flatten(items);
const splittedAndWrappedItems = menuContainer.instance().splitAndWrapMenus(flattenItems, props);//I use menuContainers's splittedAndWrappedItems instance


describe('<MobileMenu />', () => {

  it('should render the mobileMenu component', () => {
    const wrapper = shallow(
      <MobileMenu />
    );
    expect(wrapper).to.have.length(1);
  });

  it('should NOT render if list of items is NOT provided', () => {

    const wrapper = shallow(
      <MobileMenu />
    );
    expect(wrapper.find('ul')).to.have.length(0);
  });

  it('should NOT render if list is empty array', () => {

    const wrapper = shallow(
      <MobileMenu itemsMobile = { [] } />
    );
    expect(wrapper.find('ul')).to.have.length(0);
  });

  it('should render the list of itemsMobile if provided ', () => {
    
    const wrapper = mount(<Provider store = { store } >
      <MobileMenu itemsMobile = { splittedAndWrappedItems } { ...props } />
    </Provider>);

    expect(wrapper.find('ul')).to.have.length(3);
  });

  it('should have Toggle button', () => {
    
    const wrapper = mount(<Provider store = { store } >
      <ConnectedMobileMenu itemsMobile = { splittedAndWrappedItems } { ...props } />
    </Provider>);
    
    expect(wrapper.find('Connect(Toggle)')).to.have.length(1);
    expect(wrapper.find('Toggle')).to.have.length(1);
    expect(wrapper.find(Button)).to.have.length(1);

  });

  it('should be able to click on the toggle button and open the mobile menu', () => {
    let wrapper = mount(<Provider store = { store } >
      <ConnectedMobileMenu itemsMobile = { splittedAndWrappedItems } { ...props } />
    </Provider>);

    expect(wrapper.find(`.${style.mainMenuMobile}`)).to.have.length(1);
    //The menu is closed, hence the open class for the menu shouldn't be there
    expect(wrapper.find(`.${style.mainMenuMobile}`).hasClass(`${style.mainMenuOpen}`)).to.be.false;

    //Let's simulate the click
    wrapper.find('svg').first().simulate('click');

    //which change the toggle state in the store
    const changeOfState = { toggle: { 'fakeMenuName': -2 } };
    const newState = mockStore(changeOfState);
    //The state is changed
    wrapper = mount(<Provider store = { newState } >
      <ConnectedMobileMenu itemsMobile = { splittedAndWrappedItems } { ...props } />
    </Provider>);
    //The open class for the menu should be there now
    expect(wrapper.find(`.${style.mainMenuMobile}`).hasClass(`${style.mainMenuOpen}`)).to.be.true;

  });

  it('should have a close button and a list of visible elements when the menu is open ', () => {
    
    const state = { toggle: { 'fakeMenuName': -2 } }; //I need the menu open
    const store = mockStore(state);

    const wrapper = mount(<Provider store = { store } >
      <ConnectedMobileMenu itemsMobile = { splittedAndWrappedItems } { ...props } />
    </Provider>);

    //The open class for the menu should be there
    expect(wrapper.find(`.${style.mainMenuMobile}`).hasClass(`${style.mainMenuOpen}`)).to.be.true;

    expect(wrapper.find(`.${style.closeX}`)).to.have.length(1);
    expect(wrapper.find(`.${style.mainMenuMobileList}`)).to.have.length(1);
    expect(wrapper.find('svg').at(1)).to.have.length(1);
    expect(wrapper.find(ItemList)).to.have.length(2);
    expect(wrapper.find(Item)).to.have.length(4);

  });
});