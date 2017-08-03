import React, {Component} from 'react';
import PropTypes from 'prop-types';
// Components
import Icon from 'presentational/Icon';
import Button from 'presentational/Button';
import PrintHtml from 'presentational/PrintHtml';
//alertStyle
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';
import alertStyle from 'components/Alert.scss';
// Helpers
import { CSSTransitionGroup } from 'react-transition-group';

import classNames from 'classnames';
import { 
  defaultDanger, 
  defaultInfo, 
  defaultSuccess, 
  defaultWarning 
} from 'variables/messages';


/**
 * <Alert /> component.
 */
export class Alert extends Component {
  /**
   * Implements propTypes().
   *
   * @return {Object} - propType object.
   * @prop {string} className - class name for Alert.
   */
  static get propTypes() {
    return {
      className: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
      ]),
      type: PropTypes.oneOf(['default', 'success', 'info', 'warning', 'danger']),
      message: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.node
      ]),
      dismissable: PropTypes.bool,
      dismissIconCode: PropTypes.string,
      buttonText: PropTypes.string,
      buttonClass: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
      ]),
      iconClass: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
      ])
    };
  }
  
  /**
   * Implements defaultProps().
   *
   * @return {Object} - propType object.
   * @prop {string} defaultText - Default input text.
   */
  static get defaultProps() {
    return {
      type: 'default',
      dismissable: true,
      dismissIconCode: 'close'
    };
  }

  /**
   * @param {object} props - props passed
   */
  constructor(props){
    super(props);
    this.state = { isVisible: true };
  }

  /**
   * Handles dismissing an alert.
   * Sets a cookie with ID when cookieId prop is set.
   * @return {Void} - sets isVisible state to false
   */
  handleDismissAlert = () => {
    this.setState({ isVisible: false });
  }

  /**
   * Return either a button or icon component
   * @return {Object} - The dismiss alert CTA.
   */
  getDismissIconOrButton = () => {
    const {
      buttonText,
      buttonClass,
      iconClass,
      dismissIconCode
    } = this.props;

    if (buttonText) {
      return (
        <Button
          buttonClass = { classNames([alertStyle.dismissCta, alertStyle.dismissButton, buttonClass]) } 
          buttonText = { buttonText } n
          onClick = { this.handleDismissAlert } />
      );
    } else {
      return ( 
        <Icon 
          size = 'small'
          className = { classNames([alertStyle.dismissCta, alertStyle.dismissIcon, iconClass])  } 
          onClick = { this.handleDismissAlert } 
          iconName = { dismissIconCode } />
      );
    }
  }

  /**
   * Renders <Alert /> component.
   *
   * @return {JSX} - renders an Alert.
   */
  render() {
    const {
      className,
      message,
      type,
      dismissable
    } = this.props;

    let defaultMessage;
    if (!message) {
      switch(type) {
        case 'info':
          defaultMessage = defaultInfo;
          break;
        case 'danger':
          defaultMessage = defaultDanger;
          break;
        case 'success':
          defaultMessage = defaultSuccess;
          break;
        case 'warning':
          defaultMessage = defaultWarning;
          break;
      }
    }

    const alertTypeClasses = classNames([bootstrap[`alert-${type}`], alertStyle[`alert-${type}`]]);
    const dismissableClass = dismissable ? bootstrap.alertDismissable : null;
    const dismissCta = dismissable ? this.getDismissIconOrButton() : null;
   
    return (
      <CSSTransitionGroup 
        transitionName = { {
          leave: alertStyle.alertLeave,
          leaveActive: alertStyle.alertLeaveActive
        } }
        transitionEnterTimeout = { Number(alertStyle.transition) } 
        transitionLeaveTimeout = { Number(alertStyle.transition) }>
        { this.state.isVisible ? 
          <div className = { classNames([bootstrap.alert, alertTypeClasses, dismissableClass, className]) }>
            {dismissCta}
            <PrintHtml text = { message || defaultMessage } />

          </div> : null }
      </CSSTransitionGroup>
    );
  }
}

export default Alert;