import React, { Component } from 'react';
import InputGroup from 'presentational/InputGroup';
import Icon from 'presentational/Icon';
import Button from 'presentational/Button';
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';

/**
 * <InputGroupStyleGuide /> component.
 */
class InputGroupStyleGuide extends Component {
  /**
   * Renders the InputGroupStyleGuide component.
   *
   * @return {JSX} - rendered InputGroupStyleGuide page.
   */
  render() {
    const icon = <Icon iconName = { 'search' } />;

    return (
      <div>
        <h1>Input Group</h1>
        <h4>Examples of Prefix and Suffix types</h4>
        <br />
        <InputGroup 
          label = 'String prefix' 
          placeholder = 'Username' 
          prefix = { '@' } />
        <br />
        <InputGroup 
          label = 'String suffix' 
          placeholder = { 'Recipient\'s email' }
          suffix = { '@example.com' } />
        <br />
        <InputGroup 
          label = 'Numbers' 
          placeholder = { 'A number type example' }
          prefix = { 123 }
          suffix = { 456 } />
        <br />
        <InputGroup 
          label = 'Mixed array of types - numbers, component and string' 
          placeholder = 'this is a placeholder' 
          prefix = { [123, icon, 'First'] }
          suffix = { [456, icon, 'Second'] } />
        <br />
        <h3>Sizing</h3>
        <InputGroup 
          sizeLg
          label = 'Large' 
          placeholder = { 'Username' }
          prefix = { '@' } />
        <br />
        <InputGroup 
          label = 'Default' 
          placeholder = 'Username' 
          prefix = { '@' } />
        <br />
        <h3>Buttons</h3>
        <InputGroup
          label = 'Default' 
          placeholder = 'Search' 
          suffix = { <Button buttonClass = { bootstrap.btnSuccess } buttonText = { 'Success' } /> } />
        <br />
        <InputGroup
          label = 'Default' 
          placeholder = 'Placeholder text' 
          prefix = { <Button buttonClass = { bootstrap.btnWarning } buttonText = { 'Info' } /> }
          suffix = { <Button buttonClass = { bootstrap.btnSuccess } buttonText = { 'Success' } /> } />
        <br />
        <InputGroup
          sizeLg
          label = 'Large' 
          placeholder = 'Search' 
          suffix = { <Button buttonClass = { bootstrap.btnSuccess } buttonText = { 'Success' } /> } />
        <br />
        <InputGroup
          sizeLg
          label = 'Large' 
          placeholder = 'Placeholder text' 
          prefix = { <Button buttonClass = { bootstrap.btnPrimary } buttonText = { 'Error' } /> }
          suffix = { <Button buttonClass = { bootstrap.btnSuccess } buttonText = { 'Success' } /> } />
        <br />
        <h3>Input with clear text icon</h3>
        <InputGroup
          placeholder = 'Type something to see the X icon and clear the text'
          inputWithClearText = { true }
          suffix = { <Button buttonClass = { bootstrap.btnSuccess } buttonText = { 'Button' } /> } />          
      </div>
    );
  }
}

export default InputGroupStyleGuide;