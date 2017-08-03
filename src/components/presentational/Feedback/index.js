// @flow 

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Components
import Label from 'presentational/Label';


/**
 * <Feedback /> component.
 */
class Feedback extends PureComponent {

  /**
   * Implements propTypes().
   *
   * @return {Object} - propType object.
   * @prop {string} className - class name for logo.
   */
  static propTypes = {
    text: PropTypes.string,
    labelText: PropTypes.string,
    labelClass: PropTypes.string,
    feedbackifyCode: PropTypes.string
  };

  /**
   * Handles a click on a link to trigger the Feedback modal.
   *
   * @param {Event} e - click event on feedback content.
   * @return {void}
   */
  handleFeedbackClick = (e : Event & { target: HTMLAnchorElement } ) => {
    // need this to convince flow that tagName is something it understands
    if (e.target.tagName.toLowerCase() === 'a' && typeof global.fby.push === 'function') { 
      global.fby.push(['showForm', this.props.feedbackifyCode]);
      e.preventDefault();
    } 
  }

  /**
   * Renders <Feedback /> component.
   *
   * @return {JSX} - renders the feedback content.
   */
  render() : React.Element<*> | null {
    if (!(this.props.text || this.props.labelText)) {
      return null;
    }
    const {
      text,
      labelText,
      labelClass,
      feedbackifyCode,
      ...props
    } = this.props;
    const labelComponent = labelText ?
      <Label className = { labelClass }>{ labelText }</Label> :
      null;
    const textComponent = text ?
      <div dangerouslySetInnerHTML = { {__html: text} } /> :
      null;
    // If feedbackify is set then attach the click handler.
    if (feedbackifyCode) {
      props.onClick = this.handleFeedbackClick;
    }
    return (
      <div { ...props }>
        { labelComponent }
        { textComponent }
      </div>
    );
  }

  /**
   * Injects external Feedbackify code.
   *
   * @returns {void}
   */
  injectScript() {
    // Find the body, which is outside of the app route and append a script.
    // Should be refactored if body will also become part of the React app.
    if (!document.getElementById('fby-script')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = '//cdn.feedbackify.com/f.js';
      script.id = 'fby-script';
      document.getElementsByTagName('body')[0].appendChild(script);
    }
    // The script is not removed because might be used by some other component
    // if needed.
  }

  /**
   * Implements componentDidMount().
   *
   * @returns {void}
   */
  componentDidMount() {
    if (this.props.feedbackifyCode) {
      this.injectScript();  // @todo we were passing in the code but it wasn't being used.  Do we need to inject it?
    }
  }

  /**
   * Implements componentWillReceiveProps().
   *
   * @param {Object} nextProps - next properties.
   * @returns {void}
   */
  componentWillReceiveProps(nextProps : Object) {
    if (nextProps.feedbackifyCode && this.props.feedbackifyCode !== nextProps.feedbackifyCode) {
      this.injectScript();
    }
  }
}

export default Feedback;
