import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
//Style
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';

/**
 * <Select /> component 
 */
class Select extends PureComponent {
  /**
   * propTypes().
   *
   * @prop {array} items - the items to display in the select.
   */
  static propTypes = {
    name: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    defaultDisabled: PropTypes.string,
    className: PropTypes.string,
    multiple: PropTypes.bool
  };

  /**
  * Implements defaultProps().
  */
  static get defaultProps() {
    return {
      className: bootstrap.formControl
    };
  }

  /**
   * Renders <Select /> component.
   *
   * @return {JSX} - rendered Select component.
   */
  render() {
    const {
      name,
      items,
      defaultDisabled,
      className,
      multiple
    } = this.props;

    const selected = defaultDisabled ? <option value = '' disabled>{ defaultDisabled }</option> : null;
    const defaultValue = multiple ? [''] : '';

    return (
      <select name = { name } multiple = { multiple } defaultValue = { defaultValue } className = { className }>
        { selected }
        {
          items.map((item, key) => {
            return <option key = { key } value = { item.value } >{ item.text }</option>;
          })
        }
      </select>);
  }
}

export default Select;