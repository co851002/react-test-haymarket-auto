import React from 'react';
//hoc
import moreMenu from 'hoc/MoreMenu';
import { MoreMenu } from 'hoc/MoreMenu';
//components
import Menu from 'presentational/Menu';
// import { MenuContainer } from 'containers/MenuContainer';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
const initialState = { menus: { mergedMenus: [], visibleMenu: [] }, isMobile: false, toggle: {'visibleMenu': null} };
const store = mockStore(initialState);

const DynamicMenu = moreMenu(Menu);

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
      weight: 90,
      offsetWidth: 90
    },
    {
      active: false,
      children: [],
      elemId: 3,
      parent: 0,
      path: '/fakepath3',
      text: 'fake3',
      type: 'fakemenu',
      weight: 91,
      offsetWidth: 90
    }
  ],
  elemId: 1,
  parent: 0,
  path: '/fakepath1',
  text: 'fake1',
  type: 'fakemenu',
  weight: 10,
  offsetWidth: 90
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
  offsetWidth: 90
},
{
  active: false,
  children: [],
  elemId: 5,
  parent: 0,
  path: '/fakepath5',
  text: 'fake5',
  type: 'fakemenu2',
  weight: 12,
  offsetWidth: 90
}    
];

let props = {
  menusIDs: ['main-menu', 'social-menu'],
  menuName: 'visibleMenu',
  menuIconArrow: 'o',
  moreMenuText: 'More Menu',
  items: items,
  menuItemClasses: {
    activeClass: 'main_menu.active',
    hasChildrenClass: 'bootstrap.dropdown',
    openClass: 'bootstrap.open'
  },
  navClasses: {
    nav: 'navClass',
    children: 'childrenClass',
    hasChildren: 'dropdownClass'
  },
  moreMenuFixedCount: 0,
  moremenuName: 'moremenu',
  mergedMenusName: 'mergedMenus',
  dispatch:  () => {},
  splitAndWrapMenus: () => {}
};

/**
* Test for <MoreMenu /> hoc component.
* @test {MoreMenu}
*/
describe('<MoreMenu />', () => {
  
  //This test is important because the visibleMenu can be empty, as it gets updated after every call to MERGE_MENUS, this means
  //that items can absolutely be empty and it means that all the elements can be in the moremenu
  it('should still render Menu with items []', () => {
    const wrapper = mount(<Provider store = { store } >
      <DynamicMenu { ...props } items = { [] } />
    </Provider>);
    expect(wrapper).to.have.length(1);
    expect(wrapper.find(Menu)).to.have.length(1);
  });

  it('shouldn\'t render if items don\'t exist', () => {
    const wrapper = mount(<Provider store = { store } >
      <DynamicMenu { ...props } items = { null } />
    </Provider>);
    expect(wrapper).to.have.length(1);
    expect(wrapper.find(Menu)).to.have.length(0);
  });

  // it('should render MoreMenu with moremenu present', () => {
    
  //   let menuContainerInstance = shallow(<MenuContainer { ...props } menus = { items } />);

  //   //We need the connected component
  //   let wrapper = mount(<Provider store = { store } >
  //     <MoreMenu { ...props } menus = { { items: items, moremenu: [], visibleMenu: items } } splitAndWrapMenus = { menuContainerInstance.instance().splitAndWrapMenus } moreMenuFixedCount = { 2 } />
  //   </Provider>);

  //   const newState = { menus: { mergedMenus: [{},{}], moremenu: [{}], visibleMenu: [{},{}] }, isMobile: false, toggle: {'visibleMenu': null} };

  //   //the moremenu gets populated
  //   wrapper.setState( newState );

  //   expect(wrapper).to.have.length(1);

  //   wrapper.unmount();

  // });

  it('should have 1 visible element with enough space (moremenu not needed) - CASE 1', () => {

    const stubFindDom = sinon.stub(ReactDOM, 'findDOMNode');

    stubFindDom.onFirstCall().returns(
      {
        children: [items[0]], //We need only one element
        clientWidth: 400 //large enough to contains the element => clientWidth: 90
      });
    
    stubFindDom.onSecondCall().returns({offsetWidth: 10});//Second with arg moremenu

    let spyCreate = sinon.spy(MoreMenu.prototype, 'dispatchMoreMenu');

    //0 fixed elements
    let wrapper = mount(<Provider store = { store } >
      <DynamicMenu { ...props } moreMenuFixedCount = { 0 } />
    </Provider>);
    
    //The initial stste of the moremenu is set to true and therefore the moremenu element is present
    expect(wrapper.text()).to.contain('More Menu');

    //We need to trigger the moremenu
    window.dispatchEvent(new Event('resize'));
    
    stubFindDom.restore();
    spyCreate.restore();

    //More menu is not needed, the state has changed and the moremenu disappeared
    expect(wrapper.text()).to.not.contain('More Menu');
    //No need to use moremenu, no need to call dispatchMoreMenu
    expect(spyCreate.called).to.be.false;
    wrapper.unmount();

  });

  it('should have 2 visible elements with enough space (moremenu not needed) - CASE 2', () => {

    const stubFindDom = sinon.stub(ReactDOM, 'findDOMNode');

    stubFindDom.onFirstCall().returns(
      {
        children: [items[0], items[1]], //We need only one element
        clientWidth: 400 //large enough to contains the element => clientWidth: 90
      });
    
    stubFindDom.onSecondCall().returns({offsetWidth: 10});//Second with arg moremenu

    let spyCreate = sinon.spy(MoreMenu.prototype, 'dispatchMoreMenu');

    //0 fixed elements
    let wrapper = mount(<Provider store = { store } >
      <DynamicMenu { ...props } moreMenuFixedCount = { 0 } />
    </Provider>);
    
    //The initial stste of the moremenu is set to true and therefore the moremenu element is present
    expect(wrapper.text()).to.contain('More Menu');

    //We need to trigger the moremenu
    window.dispatchEvent(new Event('resize'));
    
    stubFindDom.restore();
    spyCreate.restore();

    //More menu is not needed, the state has changed and the moremenu disappeared
    expect(wrapper.text()).to.not.contain('More Menu');
    //No need to use moremenu, no need to call dispatchMoreMenu
    expect(spyCreate.called).to.be.false;
    wrapper.unmount();

  });

  it('should have 2 visible elements with enough space (moremenu not needed) - CASE 2', () => {

    const stubFindDom = sinon.stub(ReactDOM, 'findDOMNode');

    stubFindDom.onFirstCall().returns(
      {
        children: [items[0], items[1]], //We need only one element
        clientWidth: 400 //large enough to contains the element => clientWidth: 90
      });
    
    stubFindDom.onSecondCall().returns({offsetWidth: 10});//Second with arg moremenu

    let spyCreate = sinon.spy(MoreMenu.prototype, 'dispatchMoreMenu');

    //0 fixed elements
    let wrapper = mount(<Provider store = { store } >
      <DynamicMenu { ...props } moreMenuFixedCount = { 0 } />
    </Provider>);
    
    //The initial stste of the moremenu is set to true and therefore the moremenu element is present
    expect(wrapper.text()).to.contain('More Menu');

    //We need to trigger the moremenu
    window.dispatchEvent(new Event('resize'));
    
    stubFindDom.restore();
    spyCreate.restore();

    //More menu is not needed, the state has changed and the moremenu disappeared
    expect(wrapper.text()).to.not.contain('More Menu');
    //No need to use moremenu, no need to call dispatchMoreMenu
    expect(spyCreate.called).to.be.false;
    wrapper.unmount();

  });  

  it('should have 2 visible elements with enough space, but 2 fix elements in the moremenu. All go in the moremenu - CASE 3', () => {

    const stubFindDom = sinon.stub(ReactDOM, 'findDOMNode');

    stubFindDom.onFirstCall().returns(
      {
        children: [items[0], items[1]], //We need only one element
        clientWidth: 400 //large enough to contains the element => clientWidth: 90
      });
    
    stubFindDom.onSecondCall().returns({offsetWidth: 10});//Second with arg moremenu

    let spyCreate = sinon.spy(MoreMenu.prototype, 'dispatchMoreMenu');

    //0 fixed elements
    let wrapper = mount(<Provider store = { store } >
      <DynamicMenu { ...props } moreMenuFixedCount = { 2 } />
    </Provider>);
    
    //The initial stste of the moremenu is set to true and therefore the moremenu element is present
    expect(wrapper.text()).to.contain('More Menu');

    //We need to trigger the moremenu
    window.dispatchEvent(new Event('resize'));
    
    stubFindDom.restore();
    spyCreate.restore();

    //More menu is needed as we have fix elements in the moremenu, the state has NOT changed therefore the moremenu is still there
    expect(wrapper.text()).to.contain('More Menu');
    //We need the moremenu, we aspect a call of dispatchMoreMenu
    expect(spyCreate.called).to.be.true;
    expect(spyCreate.calledWith(0)).to.be.true; //All the elements go to the moremenu
    wrapper.unmount();

  });

  it('should have 3 visible elements with enough space, but 2 fix elements in the moremenu. 2 go in the moremenu - CASE 4', () => {

    const stubFindDom = sinon.stub(ReactDOM, 'findDOMNode');

    stubFindDom.onFirstCall().returns(
      {
        children: items, //We need only one element
        clientWidth: 400 //large enough to contains the element => clientWidth: 90
      });
    
    stubFindDom.onSecondCall().returns({offsetWidth: 10});//Second with arg moremenu

    let spyCreate = sinon.spy(MoreMenu.prototype, 'dispatchMoreMenu');

    //0 fixed elements
    let wrapper = mount(<Provider store = { store } >
      <DynamicMenu { ...props } moreMenuFixedCount = { 2 } />
    </Provider>);
    
    //The initial stste of the moremenu is set to true and therefore the moremenu element is present. (this is not the initial load)
    expect(wrapper.text()).to.contain('More Menu');

    //We need to trigger the moremenu
    window.dispatchEvent(new Event('resize'));
    
    stubFindDom.restore();
    spyCreate.restore();

    //More menu is needed as we have fix elements in the moremenu, the state has NOT changed therefore the moremenu is still there
    expect(wrapper.text()).to.contain('More Menu');
    //We need the moremenu, we aspect a call of dispatchMoreMenu
    expect(spyCreate.called).to.be.true;
    expect(spyCreate.calledWith(1)).to.be.true; //2 elements go to the moremenu
    wrapper.unmount();

  });

  it('should have 3 visible elements with EXACTLY the required space, but 1 fix element in the moremenu. 1 go in the moremenu - CASE 5', () => {

    const stubFindDom = sinon.stub(ReactDOM, 'findDOMNode');

    stubFindDom.onFirstCall().returns(
      {
        children: items, //We need only one element
        clientWidth: 270 //large enough to contains the element => clientWidth: 90
      });
    
    stubFindDom.onSecondCall().returns({offsetWidth: 90});//Second with arg moremenu

    let spyCreate = sinon.spy(MoreMenu.prototype, 'dispatchMoreMenu');

    //0 fixed elements
    let wrapper = mount(<Provider store = { store } >
      <DynamicMenu { ...props } moreMenuFixedCount = { 1 } />
    </Provider>);
    
    //The initial stste of the moremenu is set to true and therefore the moremenu element is present. (this is not the initial load)
    expect(wrapper.text()).to.contain('More Menu');

    //We need to trigger the moremenu
    window.dispatchEvent(new Event('resize'));
    
    stubFindDom.restore();
    spyCreate.restore();

    //More menu is needed as we have fix elements in the moremenu, the state has NOT changed therefore the moremenu is still there
    expect(wrapper.text()).to.contain('More Menu');
    //We need the moremenu, we aspect a call of dispatchMoreMenu
    expect(spyCreate.called).to.be.true;
    expect(spyCreate.calledWith(2)).to.be.true; //2 elements go to the moremenu
    wrapper.unmount();

  });

  it('should have 3 visible elements (0 fix elements), but there is space for only 2. Moremenu is required. 1 go in the moremenu - CASE 6', () => {

    const stubFindDom = sinon.stub(ReactDOM, 'findDOMNode');

    stubFindDom.onFirstCall().returns(
      {
        children: items, //We need only one element
        clientWidth: 260 //clientWidth: 3*90=270
      });
    
    stubFindDom.onSecondCall().returns({offsetWidth: 60});//Second with arg moremenu

    let spyCreate = sinon.spy(MoreMenu.prototype, 'dispatchMoreMenu');

    //0 fixed elements
    let wrapper = mount(<Provider store = { store } >
      <DynamicMenu { ...props } moreMenuFixedCount = { 0 } />
    </Provider>);
    
    //The initial stste of the moremenu is set to true and therefore the moremenu element is present. (this is not the initial load)
    expect(wrapper.text()).to.contain('More Menu');

    //We need to trigger the moremenu
    window.dispatchEvent(new Event('resize'));
    
    stubFindDom.restore();
    spyCreate.restore();

    //More menu is needed, the state has NOT changed therefore the moremenu is still there
    expect(wrapper.text()).to.contain('More Menu');
    //We need the moremenu, we aspect a call of dispatchMoreMenu
    expect(spyCreate.called).to.be.true;
    expect(spyCreate.calledWith(1)).to.be.true; //1 element go to the moremenu
    wrapper.unmount();

  });

  it('should have 3 visible elements (0 fix elements), but there is space for only 2. Moremenu is required, but moremenu is too big therefore 2 go in the moremenu - CASE 7', () => {

    const stubFindDom = sinon.stub(ReactDOM, 'findDOMNode');

    stubFindDom.onFirstCall().returns(
      {
        children: items, //We need only one element
        clientWidth: 260 //clientWidth: 90*3=270
      });
    
    stubFindDom.onSecondCall().returns({offsetWidth: 90});//Second with arg moremenu

    let spyCreate = sinon.spy(MoreMenu.prototype, 'dispatchMoreMenu');

    //0 fixed elements
    let wrapper = mount(<Provider store = { store } >
      <DynamicMenu { ...props } moreMenuFixedCount = { 0 } />
    </Provider>);
    
    //The initial state of the moremenu is set to true and therefore the moremenu element is present (this is not the initial load)
    expect(wrapper.text()).to.contain('More Menu');

    //We need to trigger the moremenu
    window.dispatchEvent(new Event('resize'));
    
    stubFindDom.restore();
    spyCreate.restore();

    //More menu is needed, the state has NOT changed therefore the moremenu is still there
    expect(wrapper.text()).to.contain('More Menu');
    //We need the moremenu, we aspect a call of dispatchMoreMenu
    expect(spyCreate.called).to.be.true;
    expect(spyCreate.calledWith(1)).to.be.true; //1 element go to the moremenu
    wrapper.unmount();

  });

  it('should have 3 visible elements (0 fix elements) with enough space. After a resize there is enough space only for 1, Moremenu is required. 2 go in the moremenu- CASE 8', () => {
    
    const stubFindDom = sinon.stub(ReactDOM, 'findDOMNode');

    stubFindDom.onCall(0).returns(
      {
        children: items,
        clientWidth: 270 //large enough to contains all the elements 90*3=270
      });
    
    stubFindDom.onCall(1).returns({offsetWidth: 90});//Second with arg moremenu
    
    //moremene is not needed, therefore the state needs to be updated and createMoreMenu re-run again. Because we are stubbing
    //findDOMNode, that gets called a third time.
    stubFindDom.onCall(2).returns(
      {
        children: items,
        clientWidth: 180
      });

    stubFindDom.onCall(3).returns({offsetWidth: 90});//Second with arg moremenu
    
    let spyCreate = sinon.spy(MoreMenu.prototype, 'dispatchMoreMenu');

    const initialState = { menus: { mergedMenus: items, visibleMenu: [] }, toggle: {'visibleMenu': null} };
    const newStore = mockStore(initialState);
    
    let wrapper = mount(<Provider store = { newStore } >
      <DynamicMenu { ...props } moreMenuFixedCount = { 0 } />
    </Provider>);

    //The initial state of the moremenu is set to true and therefore the moremenu element is present (this is not the initial load)
    expect(spyCreate.called).to.be.false;

    window.dispatchEvent(new Event('resize'));

    stubFindDom.restore();
    spyCreate.restore();

    //More menu is needed, the state has NOT changed therefore the moremenu is still there
    expect(wrapper.text()).to.contain('More Menu');
    //We need the moremenu, we aspect a call of dispatchMoreMenu
    expect(spyCreate.called).to.be.true;
    expect(spyCreate.calledWith(2)).to.be.true; //2 element go to the moremenu

    wrapper.unmount();

  });

  it('should render MoreMenu', () => {
    
    const newState = { menus: { mergedMenus: [{},{}], visibleMenu: [{},{},{}] }, isMobile: false, toggle: {'visibleMenu': null} };
    const newStore = mockStore(newState);

    const wrapper = mount(<Provider store = { newStore } >
      <DynamicMenu { ...props } />
    </Provider>);
    expect(wrapper).to.have.length(1);
    wrapper.unmount();
  });

  it('should run componentDidMount', () => {
    let spyDynamicMenu = sinon.spy(DynamicMenu.prototype, 'componentDidMount');
    
    const wrapper = mount(<Provider store = { store } >
      <DynamicMenu { ...props } />
    </Provider>);
    
    spyDynamicMenu.restore();

    expect(spyDynamicMenu.called).to.be.true;
    
    wrapper.unmount();
  });

  it('should have the Menu component and it has to be wrapped with MoreMenu component', () => {
    const wrapper = mount(<Provider store = { store } >
      <DynamicMenu { ...props } />
    </Provider>);

    expect(wrapper.find(Menu)).to.have.length(1);
    expect(wrapper.find('Connect(MoreMenu)')).to.have.length(1);
    wrapper.unmount();
  });

  it('should have all the props', () => {

    const initialState = { menus: { mergedMenus: [], moremenu: [], visibleMenu: [] }, isMobile: false, toggle: {'visibleMenu': null} };
    const store = mockStore(initialState);

    const wrapper = mount(<Provider store = { store } >
      <DynamicMenu { ...props } moreMenuFixedCount = { 4 } parentLinkActive = { 1 } />
    </Provider>);
    
    expect(wrapper.find('Connect(MoreMenu)').prop('menusIDs')).to.equal(props.menusIDs);
    expect(wrapper.find('Connect(MoreMenu)').prop('moreMenuFixedCount')).to.equal(4);
    expect(wrapper.find('Connect(MoreMenu)').prop('menuName')).to.equal(props.menuName);
    expect(wrapper.find('Connect(MoreMenu)').prop('menuIconArrow')).to.equal(props.menuIconArrow);
    expect(wrapper.find('Connect(MoreMenu)').prop('parentLinkActive')).to.equal(1);
    expect(wrapper.find('Connect(MoreMenu)').prop('navClasses')).to.deep.equal(props.navClasses);
    expect(wrapper.find('Connect(MoreMenu)').prop('splitAndWrapMenus')).to.deep.equal(props.splitAndWrapMenus);
    wrapper.unmount();
  });

  it('should call dispatchMoreMenu with no arguments and take the items = 0 default', () => {
    
    const spyDispatchMoreMenu = sinon.spy(MoreMenu.prototype, 'dispatchMoreMenu');

    const wrapperWithInstance = shallow(<MoreMenu { ...props } menus = { {} } />);
    
    wrapperWithInstance.instance().dispatchMoreMenu();

    expect(spyDispatchMoreMenu.called).to.be.true;
    expect(spyDispatchMoreMenu.calledOnce).to.be.true;

  });

  it('should return 0 when runThroughStack is called with count = 0', () => {
    
    const wrapperWithInstance = shallow(<MoreMenu { ...props } menus = { {} } />);
    
    let result = wrapperWithInstance.instance().runThroughStack(0,[],270,280);

    expect(result).is.equal(0);

  });

});