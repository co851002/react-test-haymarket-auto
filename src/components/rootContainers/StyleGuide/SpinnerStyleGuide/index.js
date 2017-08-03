import React, { Component } from 'react';
import { Col, Row } from 'presentational/Grid';
import Spinner from 'presentational/Spinner';

/**
 * <SpinnerStyleGuide /> component.
 */
class SpinnerStyleGuide extends Component {
  /**
   * Renders the StyleGuide component.
   *
   * @return {JSX} - rendered StyleGuide page.
   */
  render() {

    return (
      <div>
        <h1>Spinner</h1>        
        <Row>
          <Col colXs = { 6 } colSm = { 3 } >
            <h4>Default props:</h4>
            <h4>height: default (50px)</h4>
            <h4>width: default (50px)</h4>
            <h4>src: default</h4>
          </Col>
          <Col colXs = { 6 } colSm = { 9 }>
            <Spinner />
          </Col>
        </Row>
        <Row>
          <Col colXs = { 6 } colSm = { 3 }>
            <h4>Custom size:</h4>
            <h4>height: default (100px)</h4>
            <h4>width: default (100px)</h4>
            <h4>src: default</h4>
          </Col>
          <Col colXs = { 6 } colSm = { 9 }>
            <Spinner height = { 100 } width = { 100 } />
          </Col>
        </Row>
        <Row>
          <Col colXs = { 6 } colSm = { 3 }>
            <h4>Custom image (external src):</h4>
            <h4>height: default (50px)</h4>
            <h4>width: default (50px)</h4>
            <h4>src: external</h4>
          </Col>
          <Col colXs = { 6 } colSm = { 9 }>
            <Spinner src = 'http://samherbert.net/svg-loaders/svg-loaders/tail-spin.svg' />
          </Col>
        </Row>
      </div>
    );
  }
}

export default SpinnerStyleGuide;