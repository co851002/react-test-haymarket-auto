// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
 * Toggle HOC which add the "hover" functionality which is based on the toggle store but for hover selection of elements.
 * @param {object} WrappedComponent - component to wrap.
 * @return {object} Wrapped component with the "toggle" functionality add to it.
 */
const hover = (WrappedComponent: Object) => {
  /**
   * Tab class
   */
  return class extends Component {
    /**
    *	Props implementation.
    */
    static propTypes = {
      dataElemId: PropTypes.number.isRequired,
      hocSelectedId: PropTypes.number,
      hocSelectFunc: PropTypes.func.isRequired,
      hocDefaultToEnabled: PropTypes.bool
    };
    
    /**
    *	Default props.
    */
    static defaultProps = {
      hocDefaultToEnabled: false,
    };
    
    /**
     * If hocDefaultToEnabled is true then call the hocSelectFunc to enable this hover component.
     * @return {void} 
     */
    componentDidMount() {
      if (this.props.hocDefaultToEnabled){
        this.props.hocSelectFunc(this.props.dataElemId);
      }
    }

    /**
     * Handle hover events.  Needs to check that the hover occurs over a different element to the one currently enabled
     * before sending out a toggle event
     * @param {object} element clicked
     * @return {void}
     */
    onHover = () => {
      if (this.props.hocSelectedId !== this.props.dataElemId) {
        this.props.hocSelectFunc(this.props.dataElemId);
      }
    }

    /**
    * Render
    * @return {ReactElement} markup
    */
    render() : React.Element<*> {
      return(
        <WrappedComponent
          { ...this.props }
          handleOnMouseOver = { this.onHover }
          dataElemId = { this.props.dataElemId } />
      );
    }
  };
};

export default hover;
