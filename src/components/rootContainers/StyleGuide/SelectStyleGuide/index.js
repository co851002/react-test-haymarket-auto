import React, { Component } from 'react';
import Select from 'presentational/Select';
//Style
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';

/**
 * <SelectStyleGuide /> component.
 */
class SelectStyleGuide extends Component {
  /**
   * Renders the SelectStyleGuide component.
   *
   * @return {JSX} - rendered StyleGuide page.
   */
  render() {
    const items = [ 
      { value: 100, text: 'item 1' },  
      { value: 101, text: 'item 2' }, 
      { value: 102, text: 'item 3' },
      { value: 103, text: 'item 4' },
      { value: 104, text: 'item 5' }
    ];
    
    return (
      <div>
        <h1>Select Component</h1>
        <div className = { bootstrap.formGroup } >
          <label htmlFor = 'select1'>Single select</label>
          <Select name = 'select1' items = { items } />
          <br />
          <label htmlFor = 'select2'>Multiple select</label>
          <Select name = 'select2' items = { items } multiple = { true } />
          <br />
          <label htmlFor = 'select2'>Select with default disabled</label>
          <Select name = 'select3' items = { items } defaultDisabled = 'Select a value...'  />
          <br />
        </div>
      </div>
    );
  }
}

export default SelectStyleGuide;