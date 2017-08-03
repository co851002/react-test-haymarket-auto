// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Actions
import * as Actions from 'actionTypes';
//Style
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';
import commonStyle from 'index.scss';
import moremenuStyle from 'components/MainMenu.scss';
//components
import Toggle from 'hoc/Toggle';
import Click from 'hoc/Click';
import ReactDOM from 'react-dom';
import Item from 'presentational/Item';
import { connect } from 'react-redux';
import Icon from 'presentational/Icon';
//Helpers
import classNames from 'classnames';  
//Utils
import flatten from 'utils_functions/flatten';
//hoc
import leftRight from 'hoc/LeftRight';

const PositionedIcon = leftRight(Icon);
let MoreMenu;
/**
 * HOC that adds the "moremenu" functionality which works out how much space the menu's elements occupy. It leaves only the elements which fit in one line visible and put the others that do not fit in the more menu.
 * @param {object} WrappedComponent - Menu component
 * @return {object} - It return the element that fit the first line and the fake more menu element with the elements that do not fit in it.
 */
const moreMenu = (WrappedComponent: Object) => {
  
  /**
   * The moremenu component
   */
  MoreMenu = class extends Component {
    state: Object;
    ToggleClickItem: Function;
    shouldRerender: boolean;
    visiblemenu: Object;
    moremenu: Object;
    
    /**
     * defaultProps function
     */
    static propTypes = {
      menus: PropTypes.object,
      menuName: PropTypes.string,
      moreMenuText: PropTypes.string,
      moreMenuFixedCount: PropTypes.number,
      items: PropTypes.any,
      dispatch: PropTypes.func,
      splitAndWrapMenus: PropTypes.func,
      navClasses: PropTypes.object,
      menuIconArrow: PropTypes.string,
      moremenuName: PropTypes.string.isRequired,
      mergedMenusName: PropTypes.string,
      menusIDs: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.string,PropTypes.number)
      ]),
      moremenuID: PropTypes.number,
      parentLinkActive: PropTypes.number,
      menuItemClasses: PropTypes.object,
      toggle: PropTypes.object
    };
    
    /**
     * defaultProps function
     */
    static defaultProps = {
      items: [],
      moreMenuText: 'More', //SHOULD COME FROM API?
      moreMenuFixedCount: null,
      moremenuID: -1,
      toggle: {}
    };

    /**
     * Constructor funcion. 
     * @param {object} props -
     */
    constructor(props: Object): void {
      super(props);
      
      this.state = {
        isMoreMenuNeeded: true
      };

      this.ToggleClickItem = Toggle(Click(Item), this.props.menuName); //It wraps Item with the HOC Toggle component. It passes the name of the menu.
      this.shouldRerender = true;
    }    

    /**
     * It removes the resize event listener
     * @return {void}
     */
    componentDidMount(): void {
      window.addEventListener('resize', this.dispatchMergeMenu);
    }

    /**
     * It adds the resize event listener
     * @return {void}
     */
    componentWillUnmount(): void {
      window.removeEventListener('resize', this.dispatchMergeMenu);
    }

    /**
     * As componentDidUpdate is a critical function called everytime the component renders, we need to launch
     * fire createMoreMenu only in two situations:
     * - on first load where we have this.props.menus[this.props.menuName], but not this.props.menus.moremenu yet
     * - when an event occurs and MERGE_MENUS has been dispatched. In order to detect that, we can check
     * this.props.menus.mergedMenus.length === this.props.items.length.
     * @return {void}
     */
    componentDidUpdate() {

      let { menus, menuName, moremenuName, mergedMenusName, items } = { ...this.props };

      //- On load: (this.props.menus[this.props.menuName] && !this.props.menus.moremenu && this.state.isMoreMenuNeeded)
      //- When the component render the first time after the menus have been merged
      if( (menus[menuName] && !menus[moremenuName] && this.state.isMoreMenuNeeded) || (menus[mergedMenusName] && menus[mergedMenusName].length === items.length) ) {
        this.createMoreMenu();
      }

    }

    /**
     * It dispatches the action SET_MOREMENU which moves items into the moremenu list
     * @param {number} items - to include in MoreMenu
     * @return {void}
     */
    dispatchMoreMenu(items: number = 0): void{
      this.props.dispatch(
        {
          type: Actions.SET_MOREMENU,
          items: items, //items to include in MoreMenu where 0 means all! Because is the index of the array.
          menuName: this.props.menuName,
          moremenuName: this.props.moremenuName
        }
      );
    }

    /**It dispatches the MERGE_MENUS action.
     * @return {void}
     */
    dispatchMergeMenu = (): void => {
      this.setState({
        isMoreMenuNeeded: true
      });
      this.props.dispatch(
        {
          type: Actions.MERGE_MENUS,
          mids: this.props.menusIDs,
          menuName: this.props.menuName,
          mergedMenusName: this.props.mergedMenusName
        }
      );
    }
    
    /**
     * It runs through the stack in order to get the actual number of elements that fit with the moremenu
     * @param {*} counter - number of elements that currently fit
     * @param {*} arr - this is copy of the elements' widths
     * @param {*} containerWidth - containerWidth
     * @param {*} childrenWidth - total sum of childrenWidth
     * @return {number} - number of elements that fit
     */
    runThroughStack(counter: number, arr: Array<number>, containerWidth: number, childrenWidth: number): number {
      for(let i = counter; i > 0; i--){ //loop through the stack from the end

        childrenWidth = childrenWidth - arr[i-1]; //substract the width of the current element
        counter -= 1; //subtract number of element necessary to make the menu fit
        /*istanbul ignore else */
        if(containerWidth > childrenWidth){
          return counter;
        }
      }
      return counter;
    }

    /**
     * Creates a "More" menu item if the menu can not contain every element in one line.
     * @return {void}
     */
    createMoreMenu(): null | void {
      if (!this.props.items.length) {
        return null;
      }

      const myself = ReactDOM.findDOMNode(this.visiblemenu); //visible menu;
      //$FlowFixMe
      const children = myself.children; //visible menu's children
      //visible menu's children without the elements that must to go to the moremenu //$FlowFixMe
      const childrenVisible = Array.from(myself.children).slice(0, children.length - this.props.moreMenuFixedCount);
      const childrenVisibleLength = childrenVisible.length;

      let count = 0; //count is the index of children that fit. i.e. if arr = [a,b,c] and count = 0, it means all the elements go to the moremenu
      let childrenWidth = 0; //total sum of the childrens width
      let copyPrevChildWidth = 0;
      let stack = []; //Copy of the children's widths i.e. [90,45,116]. It's used to run through it 
      let moreWidth = 0;  
      //$FlowFixMe
      let containerWidth = myself.clientWidth;

      // Set more menun width.
      if(this.state.isMoreMenuNeeded) {
        //$FlowFixMe
        moreWidth = ReactDOM.findDOMNode(this.moremenu).offsetWidth;
      }

      for (let child of childrenVisible) {
        copyPrevChildWidth = child.offsetWidth; //Copy width in a temp var

        stack.push(copyPrevChildWidth); //add element to the stack

        childrenWidth += child.offsetWidth; //Add it to children's total

        if (containerWidth < childrenWidth) { //Is the containerWidth smaller than the current sum of childrenWidth?

          //Yes it is, so we need first to remove the last child's width cause doesn't fit and than add the moremenu's width.
          childrenWidth = childrenWidth + moreWidth - copyPrevChildWidth;
        
          //Check that the elements fit with the moremenu?
          if(containerWidth < childrenWidth){
            //If they don't, we need to make room for it, so we need to run through the stack to get the number of elements that need to go to the moremenu
            count = this.runThroughStack(count, stack, containerWidth, childrenWidth);
          }
          
          break;
        }
        count++;
      }

      //If the visible children fit all, but we still need the moremenu (fixed elements), we need to do an extra step and check whether the moremenu fits too or we need to run through the stack to get the number of elements need to go to the moremenu
      if( containerWidth > childrenWidth ){
        childrenWidth = childrenWidth + moreWidth;
        if(containerWidth < childrenWidth){
          count = this.runThroughStack(count, stack, containerWidth, childrenWidth);
        }
      }

      //We do need the moremenu as there is not enough space or there are fix elements that have to go to the moremenu.
      if(count < childrenVisibleLength || (this.props.moreMenuFixedCount > 0 && this.props.moreMenuFixedCount != null)){
        this.dispatchMoreMenu(count);
      }
      
      //If all the elements currently fit and we don't need fix elements in the more menu
      if(count === childrenVisibleLength && (this.props.moreMenuFixedCount === 0 || this.props.moreMenuFixedCount == null)){
        //we don't need the moremenu, so we need to update the state which will make the moremenu disappear.
        this.shouldRerender = false;
      }//If we didn't need the moremenu on load, but after a resize we do
      else if(count < childrenVisibleLength){
        // we need to update the state accordingly
        this.shouldRerender = true;
      }
  
      //Let's update the state only if we need to.
      if(this.state.isMoreMenuNeeded !== this.shouldRerender){
        this.setState({
          isMoreMenuNeeded: this.shouldRerender
        });
      }
    }

    /**
     * It renders
     * @return {void}
     */
    render() : React.Element<*> | null {
      if ( this.props.items == null){
        return null;
      }

      let itemsToMoreMenu;

      if(this.props.menus[this.props.moremenuName]){
        //The moremenu needs a flat menu
        itemsToMoreMenu = this.props.splitAndWrapMenus(flatten(this.props.menus[this.props.moremenuName]), this.props, this.props.navClasses.children);
      }

      //This is the fake moremenu element
      const itemContent = (
        <a 
          data-elemId = { this.props.moremenuID }
          href = "#">
          <PositionedIcon
            className = { moremenuStyle.icon }
            size = 'small'
            hocDataElemId = { this.props.moremenuID }
            iconName = { this.props.menuIconArrow }
            position = { 'r' }
            element = { this.props.moreMenuText } />
        </a>);

      const ToggleClickItem = this.ToggleClickItem;

      return (
        this.state.isMoreMenuNeeded ?
          <div className = { moremenuStyle.moremenuFlex } >
            { <WrappedComponent { ...this.props } ref = { (node) => this.visiblemenu = node } /> } {/* visible list of elements outside moremenu*/}
            <ul className = { this.props.navClasses.nav } ref = { (node) => this.moremenu = node } > {/* fake moremenu list */}
              <ToggleClickItem
                itemContent = { itemContent }
                itemChildren = { itemsToMoreMenu }
                itemClasses = { classNames(this.props.menuItemClasses.visibleLink, commonStyle.breakWords) }
                injectedElemId = { this.props.moremenuID }
                toggleClass = { bootstrap.open }
                parentActiveClass  = { this.props.parentLinkActive == null ? this.props.menuItemClasses.activeClass : '' }
                hocOnDocumentDismiss = { true } />
            </ul>
          </div>
        : 
          <WrappedComponent { ...this.props } ref = { (node) => this.visiblemenu = node } /> //If moremenu is not needed, return the normal menu
      );
    }
  };

  /**
   * It maps state to props
   * @param {object} state - is the list of menus 
   * @return {Object} -
   */
  const mapStateToProps = (state: Object): Object => {
    return {
      menus: state.menus,
      toggle: state.toggle
    };
  };
  
  return connect(mapStateToProps, null, null, { pure: false })(MoreMenu);

};

export default moreMenu;
export { MoreMenu };