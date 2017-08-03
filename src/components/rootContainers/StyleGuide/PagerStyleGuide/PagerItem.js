import React, { Component } from 'react';
import Pager from 'presentational/Pager';

/**
 * <PagerItem /> component.
 * This component is only for style guide display purposes so that each pager has its own state.
 * It simply returns a pager with a local state for each instance.
 */
class PagerItem extends Component {
  /**
   * Constructor.
   * @param {object} props - a props object
   * @return {Void} - new state
   */
  constructor (props) {
    super(props);
    this.state = {
      current: 1
    };
  }

  /**
   * Renders <Button /> component.
   * @param {number} page - a page number
   * @return {Void} - new state
   */
  gotoPage =  (page) => {
    this.setState({
      current: page
    });
  }

  /**
   * Renders the PagerItem component.
   * @return {JSX} - rendered PagerItem page.
   */
  render() {
    return (
      <div>
        <Pager 
          { ...this.props } 
          total = { 20 } 
          current = { this.state.current } 
          gotoPage = { this.gotoPage } />
      </div>
    );
  }
}

export default PagerItem;