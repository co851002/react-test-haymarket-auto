import menu from './index.js';
import * as Actions from 'actions/actionTypes';

const items = [{
  elemId: 1,
  text: 'Menu 1',
  path: '/menu-1',
  parent: 0,
  weight: 10
},
{
  elemId: 2,
  text: 'Menu 2',
  path: '/menu-2',
  parent: 0,
  weight: 0
},
{
  elemId: 3,
  text: 'Menu 3',
  path: '/menu-3',
  parent: 0,
  weight: -10
},
{
  elemId: 4,
  text: 'Child Menu 1',
  path: '/child-menu-1',
  parent: 2,
  weight: -10
},
{
  elemId: 5,
  text: 'Child Menu 2',
  path: '/child-menu-2',
  parent: 2,
  weight: -100
}];

describe('menu reducer', () => {
  it('should return the initial state', () => {
    expect(menu(undefined, {type: 'INIT'})).to.deep.equal({});
  });

  it('should handle APPLY_MENU with correct ordering', () => {
    const initialState = {};
    deepFreeze(initialState);
    const expectedState = {
      'test-menu': [  {
        elemId: 3,
        text: 'Menu 3',
        path: '/menu-3',
        parent: 0,
        weight: -10,
        active: false,
        children: []
      },
      {
        elemId: 2,
        text: 'Menu 2',
        path: '/menu-2',
        parent: 0,
        weight: 0,
        active: false,
        children: [{
          elemId: 5,
          text: 'Child Menu 2',
          path: '/child-menu-2',
          parent: 2,
          weight: -100,
          children: [],
        },
        {
          elemId: 4,
          text: 'Child Menu 1',
          path: '/child-menu-1',
          parent: 2,
          weight: -10,
          children: [],
        }]
      },{
        elemId: 1,
        text: 'Menu 1',
        path: '/menu-1',
        parent: 0,
        weight: 10,
        active: false,
        children: []
      }]
    };
    const resultState = menu(initialState, {
      type: Actions.APPLY_MENU,
      mids: ['test-menu'],
      result: {
        'test-menu': items
      }
    });
    expect(resultState).to.deep.equal(expectedState);
  });

  it('should handle APPLY_MENU with correct nesting', () => {
    const initialState = {};
    deepFreeze(initialState);
    const expectedState = {
      'test-menu': [ 
        {
          elemId: 3,
          text: 'Menu 3',
          path: '/menu-3',
          parent: 0,
          weight: -10,
          children: [],
          active: false
        },
        {
          elemId: 2,
          text: 'Menu 2',
          path: '/menu-2',
          parent: 0,
          weight: 0,
          children: [
            {
              'children': [],
              'elemId': 5,
              'parent': 2,
              'path': '/child-menu-2',
              'text': 'Child Menu 2',
              'weight': -100
            },
            {
              'children': [],
              'elemId': 4,
              'parent': 2,
              'path': '/child-menu-1',
              'text': 'Child Menu 1',
              'weight': -10
            }],
          active: false 
        },
        { 
          elemId: 1,
          text: 'Menu 1',
          path: '/menu-1',
          parent: 0,
          weight: 10,
          children: [],
          active: false 
        } 
      ]
    };
    const resultState = menu(initialState, {
      type: Actions.APPLY_MENU,
      result: {
        'test-menu': items
      }
    });

    expect(resultState).to.deep.equal(expectedState);
  });

  it('should merge correctly ', () => {

    const initialState = {
      fakeMenu1: [items[0]],
      fakeMenu2: [items[1]]
    };

    const mergedArrs = initialState.fakeMenu1.concat(initialState.fakeMenu2);

    const resultState = menu(initialState, {
      type: Actions.MERGE_MENUS,
      mids: ['fakeMenu1', 'fakeMenu2'],
      menuName: 'fakeMenuName',
      mergedMenusName: 'fakeMergedMenusName'
    });

    const expectedState = {
      fakeMenu1: [items[0]],
      fakeMenu2: [items[1]],
      fakeMenuName: mergedArrs,
      fakeMergedMenusName: mergedArrs
    };

    expect(resultState).to.deep.equal(expectedState);
        
  }); 
  
  it('should used the cached merged array, if exists. ', () => {
    
    const mergedArrs = [items[0]].concat([items[1]]);
    
    const initialState = {
      fakeMenu1: [items[0]],
      fakeMenu2: [items[1]],
      fakeMergedMenusName: mergedArrs //The array fakeMergedMenusName is already present in the state.
    };

    //Same action
    const resultState = menu(initialState, {
      type: Actions.MERGE_MENUS,
      mids: ['fakeMenu1', 'fakeMenu2'],
      menuName: 'fakeMenuName',
      mergedMenusName: 'fakeMergedMenusName',
    });

    //Same result with cached version
    const expectedState = {
      fakeMenu1: [items[0]],
      fakeMenu2: [items[1]],
      fakeMenuName: mergedArrs,
      fakeMergedMenusName: mergedArrs
    };

    expect(resultState).to.deep.equal(expectedState);
        
  }); 
  
  it('should apply SET_MOREMENU correctly', () => {
    
    const mergedArrs = [items[0]].concat([items[1]]);
    
    const initialState = {
      fakeMenu1: [items[0]],
      fakeMenu2: [items[1]],
      mergedMenus: mergedArrs,
      fakeMenuName: mergedArrs
    };

    const resultState = menu(initialState, {
      type: Actions.SET_MOREMENU,
      items: 1, //items to include in MoreMenu
      menuName: 'fakeMenuName',
      moremenuName: 'fakeMoreMenuName'
    });

    const expectedState = {
      fakeMenu1: [items[0]], //stay the same
      fakeMenu2: [items[1]], //stay the same
      mergedMenus: mergedArrs, //stay the same
      fakeMenuName: [items[0]], //One element gets put in more menu, henge has one fewer element
      fakeMoreMenuName: [items[1]] //One element gets put in more menu, henge has one more element
    };

    expect(resultState).to.deep.equal(expectedState);
        
  }); 

});
