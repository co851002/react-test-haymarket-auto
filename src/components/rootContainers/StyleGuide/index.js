import React, { Component } from 'react';
import GridStyleGuide from './GridStyleGuide';
import PagerStyleGuide from './PagerStyleGuide';
import ButtonGroupStyleGuide from './ButtonGroupStyleGuide';
import ImageStyleGuide from './ImageStyleGuide';
import RatingStyleGuide from './RatingStyleGuide';
import AlertStyleGuide from './AlertStyleGuide';
import InputGroupStyleGuide from './InputGroupStyleGuide';
import SelectStyleGuide from './SelectStyleGuide';
import SpinnerStyleGuide from './SpinnerStyleGuide';
import SocialShareStyleGuide from './SocialShareStyleGuide';
import ModalStyleGuide from './ModalStyleGuide';


/**
 * <StyleGuide /> component.
 */
class StyleGuide extends Component {
  /**
   * Renders the StyleGuide component.
   *
   * @return {JSX} - rendered StyleGuide page.
   */
  render() {
    return (
      <div>
        <PagerStyleGuide />
        <ButtonGroupStyleGuide />
        <SocialShareStyleGuide />
        <AlertStyleGuide />
        <InputGroupStyleGuide />
        <SelectStyleGuide />
        <SpinnerStyleGuide />       
        <RatingStyleGuide />       
        <ImageStyleGuide />
        <ModalStyleGuide />
        <GridStyleGuide />
      </div>
    );
  }
}

export default StyleGuide;
