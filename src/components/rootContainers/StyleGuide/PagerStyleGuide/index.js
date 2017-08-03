import React, { Component } from 'react';
import PagerItem from './PagerItem';

/**
 * <PagerStyleGuide /> component.
 */
class PagerStyleGuide extends Component {

  /**
   * Renders the PagerStyleGuide component.
   * @return {JSX} - rendered PagerStyleGuide page.
   */
  render() {
    return (
      <div>
        <h1>Pagination</h1>
        <h4>Examples of pagination set with the default props of: limit: 10, total: 20.</h4>
        <h3>Default</h3>
        <PagerItem />
        <h3>First and Last buttons</h3>
        <PagerItem showFirstLast />
        <h3>Use Icons</h3>
        <PagerItem useIcons showFirstLast />
        <h3>Sizing</h3>
        <PagerItem size = 'sm' />
        <PagerItem />
        <PagerItem size = 'lg' />
      </div>
    );
  }
}

export default PagerStyleGuide;