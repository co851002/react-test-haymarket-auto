// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';

  /**
  *	LeftRight React HOC
  * @param {object} WrappedComponent to wrap 
  * @return {ReactElement} Wrapped component
  */
const leftRight = (WrappedComponent: Object) => {
  return class leftRight extends Component {
    /**
    *	Props implementation.
    */
    static propTypes =  {
      position: PropTypes.oneOf(['l', 'left', 'r', 'right']),
      element: PropTypes.any,
      hocDataElemId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    };

    /**
    * Render
    * @return {ReactElement} markup
    */
    render() : React.Element<*> {

      if(this.props.position === 'l' || this.props.position === 'left'){
        return (
          <span data-elemId = { this.props.hocDataElemId } >
            <WrappedComponent { ...this.props } />
            { this.props.element }
          </span>
        );
      }
      else if(this.props.position === 'r' || this.props.position === 'right'){
        return (
          <span data-elemId = { this.props.hocDataElemId } >
            { this.props.element }
            <WrappedComponent { ...this.props } />
          </span>
        );
      }
      else{
        return <WrappedComponent { ...this.props } />;
      }
    }
  };
};

export default leftRight;