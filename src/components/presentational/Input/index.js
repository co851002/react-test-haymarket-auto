// @flow 

import React, { Component } from 'react';
import PropTypes from 'prop-types';
//Style
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';
//Helpers
import classNames from 'classnames';

/**
  *	Input React presentational component.
  * @return {object} -
  */
export default class Input extends Component {
/**
  *	Props implementation.
  */
  static propTypes = {
    inputClasses: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]),
    onTextChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    hasAutofocus: PropTypes.bool
  };

  /**
  * Implements defaultProps().
  */
  static defaultProps = {
    inputClasses: bootstrap.formControl,
  };

  /**
   * It gets the input's value and pass it to onTextChange
   * @param {object} elem - current input's text
   * @return {void} 
   */
  handleOnChange = (elem: Event & { target: HTMLInputElement }) => {
    this.props.onTextChange(elem.target.value);
  }

  /**
  * Render
  * @return {ReactElement} markup
  */
  render() : React.Element<*> {
    const {
      placeholder,
      inputClasses,
      hasAutofocus,
      value,
      name,
      type
    } = this.props;
        
    return (
      <input
        className = { classNames([inputClasses]) }
        placeholder = { placeholder }
        value = { value }
        name = { name }
        onChange = { this.handleOnChange }
        type = { type }
        autoFocus = { hasAutofocus ? 'autoFocus' : false } />
    );
  }
}