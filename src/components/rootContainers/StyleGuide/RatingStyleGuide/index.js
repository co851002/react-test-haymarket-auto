import React, { Component } from 'react';
import Rating from 'presentational/Rating';

/**
 * <StyleGuide /> component.
 */
class RatingStyleGuide extends Component {
  /**
   * Renders the StyleGuide component.
   *
   * @return {JSX} - rendered StyleGuide page.
   */
  render() {
    return (
      <div>
        <h1>Rating</h1>
        <Rating ratedValue = { 0 } /> 
        <Rating ratedValue = { 1 } /> 
        <Rating ratedValue = { 2 } /> 
        <Rating ratedValue = { 3 } /> 
        <Rating ratedValue = { 4 } /> 
        <Rating ratedValue = { 5 } /> 
      </div> 
    );
  }
}

export default RatingStyleGuide;