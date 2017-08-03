import React from 'react';
import ConnectedMenuContainer, { MenuContainer } from 'containers/MenuContainer';
import MobileMenu from 'presentational/MobileMenu';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
const initialState = { menus: { mergedMenus: [] }, isMobile: true, toggle: {'visibleMenu': null, 'searchBar': null} };
const store = mockStore(initialState);
//Actions
import * as Actions from 'actionTypes';
//style
import main_menu from 'components/MainMenu.scss';
//Utils 
import flatten from 'utils_functions/flatten';
import shallowEqual from 'utils_functions/shallowEqual';

const items = [{
  active: false,
  children: [
    {
      active: false,
      children: [],
      elemId: 2,
      parent: 1,
      path: '/fakepath2',
      text: 'fake2',
      type: 'fakemenu',
      weight: 90
    },
    {
      active: false,
      children: [],
      elemId: 3,
      parent: 1,
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
  menusIDs: ['main-menu', 'social-menu'],
  menuName: 'visibleMenu',
  mergedMenusName: 'mergedMenus',
  menuTextMobile: 'Menu',
  menuIconArrow: 'o',
  menuIconMobile: '!',
  menus: { mergedMenus: items },
  menuItemClasses: {
    activeClass: 'main_menu.active',
    hasChildrenClass: 'bootstrap.dropdown',
    openClass: 'bootstrap.open'
  }
};

/**
* Test for <MenuContainer /> containers component.
* @test {MenuContainer}
*/
describe('<MenuContainer />', () => {

  /**
  * @test 
  */
  it('should render MenuContainer', () => {
    const wrapper = shallow(<MenuContainer />);
    expect(wrapper).to.have.length(1);
  });

  it('should correctly map state to props', () => {
    const state = {
      menus: [ {'main-menu': []}, {'social': []}, { 'merged': []} ],
      isMobile: true,
      toggle: {},
      anotherState: false
    };
    expect(MenuContainer.mapStateToProps(state)).to.deep.equal( { menus: [{'main-menu': []}, {'social': []}, { 'merged': []}], isMobile: true, toggle: {} } );
  });

  it('should render MobileMenu if state is mobile', () => {
    const wrapper = shallow(<MenuContainer isMobile = { true } />);
    expect(wrapper.find(MobileMenu)).to.have.length(1);
    expect(wrapper.find('Connect(MoreMenu(Menu))')).to.have.length(0);
  });

  it('should render Menu if state is NOT mobile', () => {
    const wrapper = shallow(<MenuContainer isMobile = { false } menus = { { 'social-menu': [{}] } }  />);
    expect(wrapper.find('Connect(MoreMenu)')).to.have.length(1);
    expect(wrapper.find(MobileMenu)).to.have.length(0);
  });

  it('should have an element nav with the correct class', () => {

    const wrapper = mount(
      <Provider store = { store } >
        <ConnectedMenuContainer  />
      </Provider>);
    expect(wrapper.find('nav').hasClass(main_menu.mainMenu)).to.be.true;
    wrapper.unmount();
  });

  it('should have all the correct props', () => {

    const wrapper = mount(
      <Provider store = { store } >
        <ConnectedMenuContainer { ...props } />
      </Provider>);      

    expect(wrapper.find(MenuContainer).prop('menuName')).to.equal(props.menuName);
    expect(wrapper.find(MenuContainer).prop('menusIDs')).to.equal(props.menusIDs);
    expect(wrapper.find(MenuContainer).prop('menuIconArrow')).to.equal(props.menuIconArrow);
    expect(wrapper.find(MenuContainer).prop('menuIconMobile')).to.equal(props.menuIconMobile);
    wrapper.unmount();
  });

  it('should call componentDidMount only once', () => {

    const spy = sinon.spy(ConnectedMenuContainer.prototype, 'componentDidMount');
    const wrapper = mount( <Provider store = { store }>
      <ConnectedMenuContainer { ...props } />
    </Provider>);
    
    expect(spy.calledOnce).to.equal(true);
    wrapper.unmount();
    spy.restore();
  });

  it('should dispatch with correct action', () => {

    const actionToTest = {
      type: Actions.FETCH_MENU,
      mids: props.menusIDs,
      menuName: props.menuName,
      mergedMenusName: props.mergedMenusName
    };

    const wrapper = mount( <Provider store = { store }>
      <ConnectedMenuContainer { ...props } />
    </Provider>);
    
    const getActions = store.getActions();
    
    const res = getActions.some( (action) => {
      return shallowEqual(action, actionToTest);
    });

    expect(res).to.equal(true);
    wrapper.unmount();

  });

  it('should splitAndWrapMenus correctly', () => {

    const wrapper = shallow(<MenuContainer { ...props } menus = { items } />);
    const flattenItems = flatten(items);
    const splittedAndWrappedItems = wrapper.instance().splitAndWrapMenus(flattenItems, props);

    expect(splittedAndWrappedItems.props.children.length).to.equal(2);
    expect(splittedAndWrappedItems.props.children[0].type).to.equal('li');
    expect(splittedAndWrappedItems.props.children[1].type).to.equal('li');

  });

  it('should return null when splitAndWrapMenus called with nothing', () => {
    const wrapper = shallow(<MenuContainer { ...props } menus = { items } />);
    expect(wrapper.instance().splitAndWrapMenus(null, props)).to.equal(null);
  });

  it('should getParentOfActiveLink correctly', () => {

    const wrapper = shallow(<MenuContainer { ...props } menus = { items } />);
    let getParentOfActiveLink = wrapper.instance().getParentOfActiveLink(items, '/fakepath3');

    expect(getParentOfActiveLink).to.equal(1);
    
    //test no params sent
    getParentOfActiveLink = wrapper.instance().getParentOfActiveLink();
    expect(getParentOfActiveLink).to.equal(null);

    //test object with no children
    getParentOfActiveLink = wrapper.instance().getParentOfActiveLink( [ { children: [], path: '/fakepath5' } ], '');
    expect(getParentOfActiveLink).to.equal(null);

  });

  it('should call componentWillReceiveProps and react to props change correctly', () => {
    const spy = sinon.spy(MenuContainer.prototype, 'componentWillReceiveProps');
    const wrapper = shallow(<MenuContainer isMobile = { false } menus = { {} } toggle = { {} } routerLocation = { { pathname: '/fakepath5' } } />);
        
    //Not called at load
    expect(spy.called).to.equal(false);

    //it simulates a resize effect where the number of elements in the prev/current menus are different from the next one
    wrapper.setProps( { menus: { 'visibleMenu': items } } );
    expect(spy.callCount).to.equal(1);
    expect(wrapper.state('activeParentLink')).to.equal(-1);

    //Back to homepage, no need to search anything. It's not the first load, it's home => id = 0
    wrapper.setProps( { routerLocation: { pathname: '' } } );
    expect(spy.callCount).to.equal(2);
    expect(wrapper.state('activeParentLink')).to.equal(0);

    //Let's change location/path to a nested child. Its father's ID is 1.
    wrapper.setProps( { routerLocation: { pathname: '/fakepath3' } } );
    expect(spy.callCount).to.equal(3);
    expect(wrapper.state('activeParentLink')).to.equal(1);

    //Let's change location/path not nested to a link with no children in the visible menu
    wrapper.setProps( { routerLocation: { pathname: '/fakepath4' } } );
    expect(spy.callCount).to.equal(4);
    expect(wrapper.state('activeParentLink')).to.equal(0);

    //Let's simulate a refresh, nothing changed, hence state has not to change
    wrapper.setProps( { routerLocation: { pathname: '/fakepath4' } } );
    expect(spy.callCount).to.equal(5);
    expect(wrapper.state('activeParentLink')).to.equal(0);

    spy.restore();
  });

  it('should dispatch MERGE_MENUS when the value of the searchBar changes', () => {
    
    const props = {
      dispatch: sinon.spy()
    };

    const wrapper = shallow(<MenuContainer { ...props } isMobile = { false } menus = { {} } toggle = { { searchBar: null } } searchBarReference = { 'searchBar' } routerLocation = { { pathname: '/fakepath5' } } />);
    
    expect(wrapper.instance().props.toggle).to.deep.equal({searchBar: null});    
    //it simulates the toggle of the searchBar
    wrapper.setProps( { toggle: { 'searchBar': -1 } } );
    
    expect(wrapper.instance().props.toggle).to.deep.equal({searchBar: -1});

    expect(props.dispatch.callCount).to.equal(1);

    expect(props.dispatch.calledWith({ 
      type: 'MERGE_MENUS',
      mids: ['main-menu', 'social-menu'],
      menuName: 'visibleMenu',
      mergedMenusName: 'mergedMenus' 
    })).to.be.true;

  });

});