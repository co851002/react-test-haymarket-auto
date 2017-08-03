// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
//Helpers
import classNames from 'classnames';
//Style
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';
//Components
import Input from 'presentational/Input';
import Icon from 'presentational/Icon';
import { isReactComponent, isDOMTypeElement } from 'utils_functions/checkReactElementsTypes';

/**
  *	InputGroup React presentational component.
  */
export class InputGroup extends Component {
  state: {
    inputValue: string
  };

  /**
    *	Props implementation.
    * @return {object} -
    */

  static propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    sizeLg: PropTypes.bool,
    inputGroupClasses: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]),
    inputClasses: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]),
    inputWithClearText: PropTypes.bool,
    hasAutofocus: PropTypes.bool,
    prefix: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element,
      PropTypes.object,
      PropTypes.array
    ]),
    suffix: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element,
      PropTypes.object,
      PropTypes.array
    ])
  };

  /**
   * Implements defaultProps().
   *
   * @return {Object} - propType object.
   */
  static defaultProps = {
    type: 'text',
    inputWithClearText: false,
    hasAutofocus: false,
    internalIconName: 'close'
  };
  
  /**
  *	InputGroup contructor.
  * @param {object} props to constructor.
  *	@constructor
  */
  constructor(props : Object) {
    super(props);
    this.state = {
      inputValue: ''
    };    
  }

  /**
   * Clears the input text by setting a new state.
   * @return {Object} - a new component state.
   */
  handleClearInput = () => {
    this.setState({ inputValue: '' });
  }

  /**
   * Set the input text by setting a new state.
   * @param {Object} currentValue - a click event. 
   * @return {Object} - a new component state.
   */
  handleOnChange = (currentValue : string) => {
    this.setState({ inputValue: currentValue });
  }

  /**
   * Wraps the prefix and suffix with a input group addon class.
   * @param {Object | string | array | element } prop - the prefix or suffix prop.
   * @return {Array | Element} - a prefix or suffix element.
   */
  getGroupPrefixSuffix = (prop: Object | string | React.Element<*> ) => { 
    if (!prop) {
      return;
    }

    // Return input group btn class for <Button/> components.
    if (isReactComponent(prop) && prop.type && prop.type.name === 'Button') {
      return <span className = { bootstrap.inputGroupBtn } >{ prop }</span>;
    }
  
    // Return one node if prop is a string, react component, element or number.
    if (typeof prop === 'string' || 
      (isReactComponent(prop) && prop.type.name !== 'Button') || 
      isDOMTypeElement(prop) || 
      typeof prop === 'number') {
      return <span className = { bootstrap.inputGroupAddon } >{ prop }</span>;
    } 

    // Return a node per item in an array.
    if (Array.isArray(prop)) {
      return prop.map((item, index) => {
        return <span key = { index } className = { bootstrap.inputGroupAddon } >{ item }</span>;
      });
    }
  }

  /**
  * Render
  * @return {ReactElement} markup
  */
  render() : React.Element<*> {
    const {
      inputValue
    } = this.state;
    
    const {
      label,
      sizeLg,
      type,
      placeholder,
      inputGroupClasses,
      inputClasses,
      inputWithClearText,
      hasAutofocus,
      internalIconName,
      prefix,
      suffix
    } = this.props;

    const groupSize = sizeLg ? bootstrap.inputGroupLg : bootstrap.inputGroupSm;
    const clearTextIconClass = inputWithClearText ? bootstrap.inputGroupBtnInternal : '';
    const groupLabel = label ?  <label>{ label }</label> : null;
    const groupPrefix = this.getGroupPrefixSuffix(prefix);
    const groupSuffix = this.getGroupPrefixSuffix(suffix);

    return (
      <div className = { bootstrap.inputGroupContainer } >
        { groupLabel }
        <div className = { classNames([bootstrap.inputGroup, inputGroupClasses, groupSize, clearTextIconClass]) } >
          { groupPrefix }
          <Input 
            inputClasses = { inputClasses }
            onTextChange = { this.handleOnChange }
            hasAutofocus = { hasAutofocus }
            placeholder = { placeholder } 
            value = { inputValue }
            type = { type } />
          {
            inputWithClearText && inputValue ?
              <span className = { classNames([bootstrap.inputGroupBtn, bootstrap.inputBtnInternalContainer]) } >
                <button 
                  className = { classNames([bootstrap.inputBtnInternal]) } 
                  type = { 'button' } 
                  onClick = { this.handleClearInput } >
                  <Icon
                    size = 'small'
                    iconName = { internalIconName } />
                </button>
              </span> : null
          }
          { groupSuffix }
        </div>
      </div>
    );
  }
}

export default InputGroup;