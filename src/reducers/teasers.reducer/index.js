//@flow

import * as Actions from 'actionTypes';

type Item = {
  elemId: number, 
  weight: number,
  children: Array<Item>
}

type ItemArray = Array<Item>

/**
 * Sort function by weiight
 * @param {object} itemA - a menu's element
 * @param {object} itemB - a menu's element
 * @return {number} - returns the weight difference
 */
const sortByWeight = (itemA: Item, itemB: Item) : number => {
  return itemA.weight - itemB.weight;
};

/**
 * It recursivly sort an array of items with children
 * @param {array} tosort - array of children to sort
 * @return {array} it returns the sorted array
 */
const recursiveSort = (tosort : ItemArray) => {
  for (let item of tosort) {
    if (typeof item.children !== 'undefined' && item.children.length) {
      recursiveSort(item.children);
    }
  }
  tosort.sort(sortByWeight);
};

/**
 * It builds the nested array of items as the array from the API arrives flat.
 * @param {array} items - array of items
 * @return {array} - nested array
 */
const structureMenu = (items: ItemArray) : ItemArray => {
  // Create associative array keyed of elemId
  const keyed = items.reduce((result, item) => {
    item.children = [];
    result[item.elemId] = item;
    return result;
  }, {});

  // Detect child items and push them into their parents
  for (let key of Object.keys(keyed)) {
    const item = keyed[key];
    if (item.parent) {
      keyed[item.parent].children.push(item);
    }
  }

  // Remove child items from their original top level positions
  for (let key of Object.keys(keyed)) {
    const item = keyed[key];
    if (item.parent) {
      delete keyed[key];
    }
    else {
      keyed[key].active = false;
    }
  }

  // Recursively order the menu items by weight
  const ordered =  Object.keys(keyed).map(key => keyed[key]);
  recursiveSort(ordered);

  return ordered;
};

type Action = {
  +type: string,
  +result: {},
  +mids: Array<string>,
  +mergedMenusName: string,
  +menuName: string,
  +mergedMenusName: string,
  +moremenuName: string,
  +target: mixed,
  +items: ItemArray
}

/**
 * It runs the correct action received
 * @param {object} state of the application
 * @param {object} action received
 * @return {object} new object whic represent the new state after the action
 */
const menu = (state : Object = {}, action : Action) : Object => {
  if (action.type === Actions.APPLY_MENU) {
    const newState = Object.assign({}, state);
    Object.keys(action.result).map((key) => {
      newState[key] = structureMenu(action.result[key]);
    });
    return newState;
  }
  else if (action.type === Actions.MERGE_MENUS) {
    const newState = Object.assign({}, state);
    let mergedArray = [];
    let mergedMenus = action.mergedMenusName;

    if(!newState[mergedMenus]){ //cache

      for (let menu of action.mids) {
        mergedArray = mergedArray.concat(newState[menu]);
      }
      newState[mergedMenus] = mergedArray;
    }
    newState[action.menuName] = newState[mergedMenus];
    return newState;
  }
  else if (action.type === Actions.SET_MOREMENU) {
    let newState = Object.assign({}, state);
    newState[action.moremenuName] = [...newState[action.menuName].slice(action.items)];
    newState[action.menuName] = [...newState[action.menuName].slice(0, action.items)];
    return newState;
  }
  return state;
};

export default menu;