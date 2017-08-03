// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
//Helpers
import classNames from 'classnames';
import hayPropTypes from 'hayPropTypes';
/**
  *	Item React Type component.
  */
export class Item extends Component {
/**
  *	Props implementation.
  */
  static propTypes = {
    itemContent: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    itemChildren: PropTypes.node,
    anchorTag: PropTypes.node,
    itemClasses: PropTypes.oneOfType(
      [
        PropTypes.string,
        PropTypes.array
      ]
    ),
    handleOnClick: PropTypes.func,
    handleOnMouseOver: PropTypes.func,
    dataElemId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    toggleClass: PropTypes.string,
    parentActiveClass: PropTypes.string,
    children: hayPropTypes.childOfType('EventsHandler')
  };

  /**
  * Implements defaultProps().
  */
  static defaultProps = {
  };

  /**
  * Render
  * @return {ReactElement} markup
  */
  render()  : React.Element<*> {
    return (
      <li 
        data-elemId = { this.props.dataElemId }
        className = { classNames([this.props.itemClasses, this.props.toggleClass, this.props.parentActiveClass]) } 
        onClick = { this.props.handleOnClick }
        onMouseOver = { this.props.handleOnMouseOver }>
        { this.props.itemContent }
        { this.props.anchorTag }
        { this.props.itemChildren }
        { this.props.children }
      </li>
    );
  }
}

export default Item;
