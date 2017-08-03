// @flow
import React, { Component } from 'react';
import Alert from 'presentational/Alert';

import voteAlertStyle from 'components/voteAlertStyle.scss';


/**
 * <VoteAlert /> component.
 */
class VoteAlert extends Component {

  /**
   * Renders the VoteButton component.
   *
   * @return {JSX} - rendered Vote Button.
   */
  render() : React.Element<*> {
    /*var item = this.props.item;*/
    return (
      <Alert
        className = { voteAlertStyle.alertMsg }
        message = { 'You can only change your Vote once, please see rules for futher information.' } />
    );
  }
}

export default VoteAlert;
