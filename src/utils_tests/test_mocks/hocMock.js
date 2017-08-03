import React, { Component } from 'react';

import Comp from './CompMock';
/**
 * Mock of a HOC
 * @param {Object} WrappedComponent -
 * @return {void}
 */
const hoc = (WrappedComponent) => {
  
  return class HOC extends Component {
    /**
     * @return {void}
     */
    render(){
      return(
        <WrappedComponent>
          {
            <Comp />
          }
        </WrappedComponent>
      );
    }
  };

};

export default hoc;