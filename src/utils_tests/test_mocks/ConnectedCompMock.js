import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
  *	ConnectedCompMock React Type component..
  */
export class ConnectedCompMock extends Component {
/**
  *	Props implementation.
  */
  static get propTypes() {
    return{};
  }
  /**
  *	Default props.
  */
  static get defaultProps() {
    return {};
  }
  /**
  *	ConnectedCompMock contructor.
  * @param {object} props to constructor.
  *	@constructor
  */
  constructor(props) {
    super(props);
  }
  /**
  *	MapStateToProps implementation.
  * @return {object} new state object
  * @param {object} state object
  */
  static mapStateToProps(state) {
    return {
      '': state
    };
  }		
  /**
  * Render
  * @return {ReactElement} markup
  */
  render() {
    return (
      <h1>I am a fake connected class Component!! :)</h1>
    );
  }
}

export default connect(ConnectedCompMock.mapStateToProps)(ConnectedCompMock);