// @flow

import React, {Component,} from 'react';
import PropTypes from 'prop-types';
import ItemListShape from 'proptypes/ItemListShape';
//Components
import Icon from 'presentational/Icon';
import Item from 'presentational/Item';
import { ExternalLink as Link } from 'presentational/ExternalLink';
//HOC
import Toggle from 'hoc/Toggle';
import Click from 'hoc/Click';
import leftRight from 'hoc/LeftRight';
//Style
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';

const PositionedIcon = leftRight(Icon); //-> HOC for positioning components

/**
 * <ItemList /> component.
 */
class ItemList extends Component<*,*,void> {
  ToggleClickItem: Function;

  /**
   * Implements propTypes().
   * Property types.
   * @prop {string} type - type of list. Can be ul or ol. ul by default.
   * @prop {string} className - class for the list component.
   * @prop {string} childrenClass - class applied to nested list.
   * @prop {function} onClick - callback for a click event on the list.
   * @prop {ListItem[]} items - array of items to render as alist.
   * @return {Object} -
   */
  static propTypes = {
    type: PropTypes.oneOf(['ul', 'ol']),
    className: PropTypes.string,
    childrenClass: PropTypes.string,
    onClick: PropTypes.func,
    items: PropTypes.arrayOf(ItemListShape),
    toggleClass: PropTypes.string,
    itemListClass: PropTypes.string,
    listID: PropTypes.string,
    toggleRef: PropTypes.string,
    menuIconArrow: PropTypes.string,
    activeClass: PropTypes.string,
    itemListRef: PropTypes.string,
    parentLinkActive: PropTypes.number,
    itemClasses: PropTypes.string
  }

  /**
   * Implements defaultProps().
   *
   * @return {Object} default properties
   * @property {string} [type='ul'] - default type of list.
   */
  static defaultProps = {
    type: 'ul',
    items: [],
    toggleClass: bootstrap.open
  };

  /**
   * @param {object} props - props passed
   */
  constructor(props : Object){
    super(props);
    this.ToggleClickItem = Toggle(Click(Item), this.props.toggleRef);
  }

  /**
   * Renders <ItemList /> component.
   *
   * @return {JSX} - ordered or unordered list.
   */
  render() : React.Element<*> | null {
    const menuEls = this.props.items;
    if ( menuEls == null || !menuEls.length){
      return null;
    }
    const ListType = this.props.type;

    const items = menuEls.map((item, key) => {

      let children : ?React.Element<*> = null;
      let content = '';
      let text = '';
    
      if (item && item.children.length) {

        children = (
          <ItemList
            itemListClass = { this.props.childrenClass } 
            activeClass = { this.props.activeClass }
            items = { item.children } />
        );

        content = (
          <a
            data-elemId = { item.elemId }
            href = "#">
            <PositionedIcon
              hocDataElemId = { item.elemId }
              size = 'small'
              iconName = { this.props.menuIconArrow }
              position = { 'r' }
              element = { item.text } />
          </a>);
      }
      else{
        if(item.icon != null){ //Does the item have an icon?
          //If yes, I need to position it
          text = (<PositionedIcon
            iconName = { item.icon.code }
            position = { item.icon.position }
            element = { item.text } />);
        }
        else{
          text = item.text;
        }
        content = <Link activeClassName = { this.props.activeClass } to = { item.path } data-parentElemId = { item.parent } >{ text }</Link>;
      }

      const ToggleClickItem = this.ToggleClickItem;

      return children ?
        <ToggleClickItem
          key = { key } 
          itemContent = { content }
          itemChildren = { children }
          itemClasses = { this.props.itemClasses }
          injectedElemId = { item.elemId }
          hocOnDocumentDismiss = { true }
          toggleClass = { this.props.toggleClass }
          parentActiveClass  = { this.props.parentLinkActive === item.elemId ? this.props.activeClass : '' } />
      :
        <Item 
          key = { key }
          itemClasses = { this.props.itemClasses }
          itemContent = { content } />;
    });

    return (
      <ListType id = { this.props.listID } onClick = { this.props.onClick } className = { this.props.itemListClass } ref = { this.props.itemListRef } >
        { items }
      </ListType>);
  }
}

export default ItemList;