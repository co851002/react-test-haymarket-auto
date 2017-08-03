import React, { Component } from 'react';
import { Col, Row } from 'presentational/Grid';
import Image from 'presentational/Image';
import imageSrc from './img/SVG.svg';

/**
 * <ImageStyleGuide /> component.
 */
class ImageStyleGuide extends Component {
  /**
   * Renders the StyleGuide component.
   *
   * @return {JSX} - rendered StyleGuide page.
   */
  render() {

    return (
      <div>
        <h1>Image</h1>
        <h4>Dynamic (external) image</h4>
        <Row>
          <Col colXs = { 6 } colSm = { 5 } colMd = { 4 } colLg = { 3 } >
            <div>
              <Image src = 'https://lumiere-a.akamaihd.net/v1/images/character_themuppets_pepe_86d94b17.jpeg?region=0,0,300,300' 
                title = 'Title value' 
                alt = 'Alt value' />
            </div>
          </Col>
        </Row>
        <h4>Static (internal) image</h4>
        <Row>
          <Col colXs = { 6 } colSm = { 5 } colMd = { 4 } colLg = { 3 } >
            <div>
              <Image src = { imageSrc } 
                title = 'Title value' 
                alt = 'Alt value' />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ImageStyleGuide;