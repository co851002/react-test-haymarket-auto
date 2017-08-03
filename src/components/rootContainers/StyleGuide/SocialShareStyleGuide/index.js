import React, { Component } from 'react';
import SocialShare from 'presentational/SocialShare';

/**
 * <SocialShareStyleGuide /> component.
 */
class SocialShareStyleGuide extends Component {
  /**
   * Renders the StyleGuide component.
   *
   * @return {JSX} - rendered StyleGuide page.
   */
  render() {
    return (
      <div>
        <h1>Social Share</h1>
        <SocialShare text = 'Hello, I just read this' 
          link = { 'http://www.bbc.co.uk/news/av/world-europe-40603311/turkey-coup-man-speaks-after-being-run-over-by-tank-twice' }
          fbAppId = { 58567469885 } /> 
      </div> 
    );
  }
}

export default SocialShareStyleGuide;