// @flow 

import React, {Component} from 'react';
import PropTypes from 'prop-types';
// Style
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';
// Helpers
import classNames from 'classnames';
import hayPropTypes from 'hayPropTypes';

/**
 * <Button /> component.
 */
export class Button extends Component {
  /**
   * Implements propTypes().
   *
   * @return {Object} - propType object.
   * @prop {string} className - class name for button.
   * @prop {string} defaultInputText - Default input text.
   * @prop {string} searchButtonText - Default Button text.
   */
  static propTypes = {
    buttonText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    buttonSuffix: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.object
    ]),
    buttonType: PropTypes.string, 
    onClick: PropTypes.func,
    href: PropTypes.string,
    buttonClass: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]),
    toggleClass: PropTypes.string,
    handleOnClick: PropTypes.func,
    dataElemId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    target: PropTypes.string,
    children: hayPropTypes.childrenOfTypes(['EventsHandler', 'Icon', 'PrintHtml'])
  };
  
  /**
   * Implements defaultProps().
   *
   * @return {Object} - propType object.
   * @prop {string} defaultText - Default input text.
   */
  static defaultProps = {
    buttonType: 'submit'
  };

  /**
   * Renders <Button /> component.
   *
   * @return {JSX} - renders a Button.
   */
  render() : React.Element<*> | null {
    if (!this.props.buttonText && !this.props.children) {
      return null;
    }

    const {
      buttonText,
      buttonSuffix,
      buttonClass,
      buttonType,
      toggleClass,
      href,
      target
    } = this.props;

    const buttonClasses = buttonClass ? classNames([bootstrap.btn, buttonClass]) : classNames([bootstrap.btn, bootstrap.btnDefault]);
    const Tag = href ? 'a' : 'button';
    const buttonTypeValue = Tag === 'button' ? buttonType : null ;
    return ( 
      <Tag
        href = { href ? href : null }
        target = { href ? target : null }
        className = { classNames([buttonClasses, toggleClass]) }
        onClick = { this.props.handleOnClick } 
        type = { buttonTypeValue }
        data-elemId = { this.props.dataElemId } >        
        { buttonText }
        { buttonSuffix }
        { this.props.children }
      </Tag>
    );
  }
}

export default Button;
