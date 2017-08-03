// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import voteButtonStyle from 'components/voteButtonStyle.scss';


/**
 * <VoteButton /> component.
 */
class VoteButton extends Component {
  /**
   * Implements propTypes().
   * @return {Object} - propType object.
   */
  static propTypes = {
    setActive: PropTypes.func,
    onItemActive: PropTypes.func,
    onClick: PropTypes.func,
    voteCount: PropTypes.func,
    item: PropTypes.object,
    active: PropTypes.bool
  };

  /**
   * Handles vote button state
   * @return {void}
   * @param {function} item - Teaser item
   */
  setActive() {
    this.props.onItemActive(this.props.item);
    this.props.onClick(this.props.voteCount);
  }
  /**
   * Renders the VoteButton component.
   *
   * @return {JSX} - rendered Vote Button.
   */
  render() : React.Element<*> {
    /*var item = this.props.item;*/
    return (<button className = { this.props.active ? voteButtonStyle.active : voteButtonStyle.vote }
      onClick = { this.setActive.bind(this) } >
      { this.props.active ? 'Voted' : 'Vote' }
    </button>
    );
  }
}

export default VoteButton;
