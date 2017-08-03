// @flow 

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//HOC
import moreMenu from 'hoc/MoreMenu';
//components
import Menu from 'presentational/Menu';
import MobileMenu from 'presentational/MobileMenu';
import ItemList from 'presentational/ItemList';
import Icon from 'presentational/Icon';

//Helpers
import classNames from 'classnames';
//Actions
import * as Actions from 'actionTypes';
//Utils 
import flatten from 'utils_functions/flatten';
import getNumberOfElementsOfArrayOfArrays from 'utils_functions/getNumberOfElementsOfArrayOfArrays';
// Style
import main_menu from 'components/MainMenu.scss';
import flex from 'shared/flex.scss';
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';

const DynamicMenu = moreMenu(Menu);

type MenuArray = Array<{path: string, children: Array<{path: string, parent: number}>}>;

/**
  *	MenuContainer React container component..
  */
export class MenuContainer extends Component<*,*,*> {
  state: {
    activeParentLink: number
  };

/**
  *	Props implementation.
  */
  static propTypes = {
    menus: PropTypes.any, //Prop that gets the state called menus.
    children: PropTypes.any,
    dispatch: PropTypes.func,
    menusIDs: PropTypes.arrayOf(PropTypes.string), //FROM API? //List of the menus involved.
    menuName: PropTypes.string, //FROM API? //Name of the menu. This is the result of the merge of all the menus involved.
    mergedMenusName: PropTypes.string, //Name of the array that will contain the merged menus
    moremenuName: PropTypes.string,
    isMobile: PropTypes.bool, //Prop that gets the state called isMobile
    menuTextMobile: PropTypes.string, //FROM API?
    menuIconMobile: PropTypes.string, //FROM API?
    closeIcon: PropTypes.string, //FROM API?
    menuIconArrow: PropTypes.string,
    routerLocation: PropTypes.object,
    navClasses: PropTypes.string,
    searchBarReference: PropTypes.string,
    toggle: PropTypes.object
  };

  /**
  *	Default props.
  */

  static defaultProps = {
    menus: [],
    menusIDs: ['main-menu', 'social-menu'], //Priority for merging menus is given by their position from left(most important) to right(less important). If moreMenuFixedCount is > 0, in the moremenu will go all the moreMenuFixedCount elements from right to left.
    menuName: 'visibleMenu',
    mergedMenusName: 'mergedMenus',
    menuTextMobile: 'Menu',
    menuIconArrow: 'o',
    menuIconMobile: '!',
    moremenuName: 'moremenu'
  };

  /**
  *	MenuContainer contructor.
  * @param {object} props to constructor.
  *	@constructor
  */
  constructor(props : Object) {
    super(props);
    this.state = {
      activeParentLink: -1
    };
  }

  /**
  *	MapStateToProps implementation.
  * @return {object} new state object
  * @param {object} state object
  */
  static mapStateToProps(state) {
    return {
      menus: state.menus,
      isMobile: state.isMobile,
      toggle: state.toggle
    };
  }	
  
  /**
   * componentDidMount implementation - It dispatches the FETCH_MENU action to get the menus elements
   * @return {void}
   */
  componentDidMount() {
    this.props.dispatch({
      type: Actions.FETCH_MENU,
      mids: this.props.menusIDs, //list of menus ids
      menuName: this.props.menuName, //name of the main menu (visible not more menu)
      mergedMenusName: this.props.mergedMenusName
    });
  }

  /**
   * componentWillReceiveProps implementation.
   * @param {object} nextProps - next props that the mounted component will receive
   * @return {void}
   */
  componentWillReceiveProps(nextProps : Object){

    const currentMenu = this.props.menus[this.props.menuName];
    const nextMenu = nextProps.menus[this.props.menuName];

    if(currentMenu){
      let link = this.state.activeParentLink; //current value

      //If the location is home, no need to search anything
      if(nextProps.routerLocation.pathname.replace(/\//g,'') === ''){
        link = 0; //resetting the value for home (just in case has changed)
      }
      //If not home, runs on: first load ( initialstate is -1) || currentMenu.length !== nextMenu.length (due to a resize event) || the route changes
      else if(this.state.activeParentLink === -1 || currentMenu.length !== nextMenu.length || (this.props.routerLocation.pathname.replace(/\//g,'') !== nextProps.routerLocation.pathname.replace(/\//g,''))){
        link = this.getParentOfActiveLink(nextMenu, nextProps.routerLocation.pathname);
      }

      //Update of the state ONLY if it needs to
      if(this.state.activeParentLink !== link){
        this.setState({
          activeParentLink: link
        });
      }
    }
    //When the searchBar gets clicked, MERGE_MENUS gets dispatched in order to trigger the moremenu
    if( (nextProps.toggle[this.props.searchBarReference] !== this.props.toggle[this.props.searchBarReference])) {
      this.props.dispatch(
        {
          type: Actions.MERGE_MENUS,
          mids: this.props.menusIDs,
          menuName: this.props.menuName,
          mergedMenusName: this.props.mergedMenusName
        }
      );
    }    
  }

  /**
   * splitAndWrapMenus - 
   * @param {array} arr - Input array 
   * @param {object} props - props object
   * @param {string} ulClass - Optional class to add to the ul element
   * @return {object} every menu of the array arr gets wrapped in a ul element
   */
  splitAndWrapMenus(arr : null | Array<{ type : string}>, props : Object, ulClass : string = '') : React.Element<*> | null {
    if (arr == null) {
      return null;
    }

    //In order to be able to style the different menus accordingly (e.g. as is the case with the main menu items 
    // and the social menu items), we need to group items by menu type and wrap them up in uls where we can add 
    // a class to them.
    let type;
    let menusArr = []; 
    let list = arr;
    let currentMenuIndex = 0;
    let listIndex = 0;
    let currentMenu = null;
    let length = list.length;

    for(let i = 0; i < length; i++) {
      let item = list[i];

      if (!type) {
        type = item.type;
      }
      if(item.type === type && i !== length - 1 ){        
        continue;
      }else{
        let indexEnd = ( i === length - 1 ) ? ( i + 1 ) : i;
        currentMenu = (
          <ItemList
            itemListClass = { main_menu[type] }
            activeClass = { props.menuItemClasses.activeClass }
            items = { list.slice(listIndex, indexEnd) }
            menuIconArrow = { props.menuIconArrow }
            { ...props.menuProps } /> );
        menusArr[currentMenuIndex] = currentMenu;
        listIndex = i;
        currentMenuIndex++;
        type = item.type;
      }
    }

    //All the menus get wrapped in a ul -> li element. 
    return (<ul className = { ulClass } >{
      menusArr.map( (elem, index) => {
        return <li key = { index } > { elem } </li>;
      })
    }</ul>);
  }

  /**
   * It gets the id of the current active link's parent. In this context is used for highlighting the parent of a dropdown list in red.
   * @param {array} arr - array of links elements. Where we need to check if a link inside of it is actually active. 
   * @param {string} newRoute - new route that comes from the router
   * @returns {number}||{null} - the id of the active link's parent, null if not found
   */
  getParentOfActiveLink(arr : MenuArray, newRoute: string){
    if(arr){
      for (let item of arr) {
        if(item.children && item.children.length){//If has children, we need to look all of them too
          let arrLength = item.children.length;
          for(let i = 0; i < arrLength; i++){//Loop through children array to seek if the active one is one of them
            //Compare child's pathname fwith the new once coming from the router
            if(item.children[i].path.replace(/\//g, '') === newRoute.replace(/\//g, '')){
              return item.children[i].parent;
            }
          }
        }
        else{//We need to know if the current active link is in the visiblemenu.
          if(item.path.replace(/\//g, '') === newRoute.replace(/\//g, '')){
            return 0;
          }
        }
      }
    }
    //The current active link is not part of the visiblemenu. If there is a moremenu, it must be there.
    return null;
  }
	
  /**
  * Render
  * @return {ReactElement} markup
  */
  render() : React.Element<*> | null {
    const menuProps = {
      menuItemClasses: {
        activeClass: main_menu.active,
        hasChildrenClass: bootstrap.dropdown,
        openClass: bootstrap.open,
        visibleLink: main_menu.visibleLink
      },
      navClasses: {
        nav: flex.listHorFlex,
        children: bootstrap.dropdownMenuExtended,
        hasChildren: bootstrap.dropdown
      }
    };

    //If mobile, we need to flatten the array, split the menus and wrap them with ul->li
    let itemsToMobileMenu = null;

    if(this.props.isMobile){
      if(this.props.menus[this.props.mergedMenusName] != null){
        itemsToMobileMenu = this.splitAndWrapMenus(flatten(this.props.menus[this.props.mergedMenusName]), menuProps);
      }
    }

    return (
      <nav className = { classNames([main_menu.mainMenu, this.props.navClasses ]) } >
        {
          this.props.isMobile ?
            <MobileMenu
              { ...menuProps }
              itemsMobile = { itemsToMobileMenu }
              menuName = { this.props.menuName }
              menuTextMobile = { this.props.menuTextMobile } 
              menuIconMobile = { <Icon iconName = { this.props.menuIconMobile } /> } //menu icon
              closeIcon = { this.props.closeIcon }  //icon for the x button
              searchBarReference = { this.props.searchBarReference } />
          :
            <DynamicMenu
              { ...menuProps } 
              moreMenuFixedCount = { getNumberOfElementsOfArrayOfArrays([this.props.menus['social-menu']]) }
              menuName = { this.props.menuName }
              mergedMenusName = { this.props.mergedMenusName }
              moremenuName = { this.props.moremenuName }
              menusIDs = { this.props.menusIDs } //for dispatching the merge action
              menuIconArrow = { this.props.menuIconArrow }
              items = { this.props.menus[this.props.menuName] }
              splitAndWrapMenus = { this.splitAndWrapMenus }//pass down the function
              parentLinkActive = { this.state.activeParentLink } //id of the active link's parent, if any.
              searchBarReference = { this.props.searchBarReference } />
        }
      </nav>
    );
  }
}

export default connect(MenuContainer.mapStateToProps, null, null, { pure: false })(MenuContainer);