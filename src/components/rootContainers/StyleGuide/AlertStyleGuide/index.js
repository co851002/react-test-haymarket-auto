import React, { Component } from 'react';
import Alert from 'presentational/Alert';

/**
 * <AlertStyleGuide /> component.
 */
class AlertStyleGuide extends Component {
  /**
   * Renders the AlertStyleGuide component.
   *
   * @return {JSX} - rendered AlertStyleGuide page.
   */
  render() {
    return (
      <div>
        <h1>Alert</h1>
        <h4>Variations of the Alert component</h4>
        <h3>Default</h3>
        <Alert message = { `<div>This is the default message styling</div>` } />
        <h3>Info</h3>
        <Alert type = 'info' />
        <h3>Sucess</h3>
        <Alert type = 'success' />
        <h3>Warning</h3>
        <Alert type = 'warning' />
        <h3>Danger</h3>
        <Alert  type = 'danger' />     
      </div>
    );
  }
}

export default AlertStyleGuide;