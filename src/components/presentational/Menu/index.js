// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemList from 'presentational/ItemList';
// PropTypes
import MenuItemsShape from 'proptypes/MenuItemsShape';

/**
 * <Menu /> component.
 */
export class Menu extends Component {
  /**
   * Implements propTypes();
   */
  static propTypes = {
    items: PropTypes.arrayOf(MenuItemsShape),
    onClick: PropTypes.func,
    menuItemClasses:  PropTypes.shape({
      activeClass: PropTypes.string,
      hasChildrenClass: PropTypes.string,
      openClass: PropTypes.string,
      visibleLink: PropTypes.string
    }),
    navClasses:  PropTypes.shape({
      nav: PropTypes.string,
      children: PropTypes.string
    }),
    menuName: PropTypes.string,
    parentLinkActive: PropTypes.number
  }

  /**
   * Implements defaultProps();
   */
  static defaultProps = {
    items: [],
    navClasses: {},
    menuItemClasses: {}
  };

  /**
   * render function
   * @return {void}
   */
  render() : React.Element<*> | null {
    
    const menuEls = this.props.items;

    if ( menuEls == null || !Object.keys(menuEls).length){
      return null;
    }

    return (
      <ItemList
        onClick = { this.props.onClick }
        itemListClass = { this.props.navClasses.nav }
        itemClasses = { this.props.menuItemClasses.visibleLink }
        childrenClass = { this.props.navClasses.children }
        activeClass = { this.props.menuItemClasses.activeClass }
        toggleRef = { this.props.menuName }
        items = { menuEls }
        parentLinkActive = { this.props.parentLinkActive }
        { ...this.props } />
    );
  }
}

export default Menu;