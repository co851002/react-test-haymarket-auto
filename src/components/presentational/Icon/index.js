import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
//Helpers
import classNames from 'classnames';
import iconStyles from 'components/Icon.scss';

import icons from 'icons/icons.svg';

/**
  *	Icon React presentational component.
  */
export class Icon extends PureComponent {
  /**
  *	Props implementation.
  * @return {object} - prop definitions
  */
  static propTypes = {
    onClick: PropTypes.func,
    iconName: PropTypes.string,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]),
    size: PropTypes.string,
    viewBox: PropTypes.string
  };

  /**
  * Implements defaultProps().
  */
  static defaultProps = {
    size: 'default',
    viewBox: '0 0 32 32' // This value matches viewBox in the svg sprite file. 
  };

  /**
  * Render
  * @return {ReactElement} markup
  */
  render() : React.Element<*> {
    const {
      iconName,
      className,
      onClick,
      size,
      viewBox

    } = this.props;

    const iconSizeClass = iconStyles[`icon-${size}`];
    
    return (
      <div className = { classNames([iconStyles.icon, iconSizeClass, className]) }>
        <svg viewBox = { viewBox } onClick = { onClick }>
          <use xlinkHref = { `${icons}#wci-${iconName}` } />
        </svg>
      </div>
    );
  }
}

export default Icon;