// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Actions
import * as Actions from 'actionTypes';
//components
import { connect } from 'react-redux';
//Style
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';

/**
 * MobileDetector component. It detects the current viewport of the application and it updates the store.
 */
export class MobileDetector extends Component {
  getViewportSize: Function;

  /**
   * Class constructor 
   * @param {object} props - passed props
   * @return {void} 
   */
  constructor(props : Object) {
    super(props);
    this.getViewportSize = this.getViewportSize.bind(this);
  }

  /**
   * propTypes function
   */
  static propTypes = {
    mobileID: PropTypes.string.isRequired,
    dispatch: PropTypes.func
  };

  /**
   * defaultProps function for setting default values.
   */
  static defaultProps = {
    mobileID: 'md'
  };

  /**
   * It runs getViewportSize as soon as the component is mounted and it attaches the resize event listener.
   * @return {void}
   */
  componentDidMount() {
    this.getViewportSize();
    window.addEventListener('resize', this.getViewportSize);
  }

  /**
   * It removes the resize event listener
   * @return {void}
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.getViewportSize);
  }

  /**
   * It detects the presence of the elmenent in the DOM and updates the store.
   * If the elemenet with the visible-xs class is present, it means the viewport is mobile.
   * @return {void}
   */
  getViewportSize() {
    var elem = document.querySelector(`#${this.props.mobileID}`);
    this.props.dispatch({
      type: Actions.SET_VIEWPORT_MOBILE,
      isMobile: elem && elem.offsetWidth !== 0 ? true : false
    });
  }

/**
 * Returns function
 * @return {void}
 */
  render() : React.Element<*> {
    return(
      <div id = { this.props.mobileID } className = { bootstrap.visibleXs } />
    );
  }
}

export default connect()(MobileDetector);