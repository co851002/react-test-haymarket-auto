import React, { Component } from 'react';
import ButtonGroup from 'presentational/ButtonGroup';
import Button from 'presentational/Button';

/**
 * <ButtonGroupStyleGuide /> component.
 */
class ButtonGroupStyleGuide extends Component {

  /**
   * Renders the ButtonGroupStyleGuide component.
   * @return {JSX} - rendered ButtonGroupStyleGuide page.
   */
  render() {
    return (
      <div>
        <h1>Button Group</h1>
        <h4>Examples of the buttonGroup component.</h4>
        <ButtonGroup>
          <Button buttonText = 'One' />
          <Button buttonText = 'Two' />
          <Button buttonText = 'Three' />
          <Button buttonText = 'Four' />
        </ButtonGroup>
        <h3>Sizing</h3>
        <ButtonGroup size = 'sm'>
          <Button buttonText = 'Small' />
          <Button buttonText = 'Small' />
          <Button buttonText = 'Small' />
          <Button buttonText = 'Small' />
        </ButtonGroup>
        <br />
        <br />
        <ButtonGroup>
          <Button buttonText = 'Default' />
          <Button buttonText = 'Default' />
          <Button buttonText = 'Default' />
          <Button buttonText = 'Default' />
        </ButtonGroup>
        <br />
        <br />
        <ButtonGroup size = 'lg'>
          <Button buttonText = 'Large' />
          <Button buttonText = 'Large' />
          <Button buttonText = 'Large' />
          <Button buttonText = 'Large' />
        </ButtonGroup>
        <h3>Vertical</h3>
        <ButtonGroup vertical>
          <Button buttonText = 'One' />
          <Button buttonText = 'Two' />
          <Button buttonText = 'Three' />
          <Button buttonText = 'Four' />
        </ButtonGroup>
      </div>
    );
  }
}

export default ButtonGroupStyleGuide;