import React, { Component } from 'react';
//Helpers
import PropTypes from 'prop-types';
import hayPropTypes from 'hayPropTypes';
import classNames from 'classnames';
//Style
import styles from 'components/Grid.scss';

/**
  *	Grid React presentational component.
  */
class Grid extends Component {
  /**
   * Props implementation.
   */
  static get propTypes() {
    return{
      isFluid: PropTypes.bool,
      className: PropTypes.string,
      children: hayPropTypes.notAllowChildrenOfTypes('Grid')
    };
  }
  /**
   * defaultProps implementation.
   */
  static get defaultProps(){
    return{
      isFluid: false
    };
  }

  /**
   * Render
   * @return {ReactElement} markup
   */ 
  render() {
    const {
      children,
      isFluid,
      className
    } = this.props;

    if (!children) {
      return null;
    }

    const gridTypeClass = isFluid ? styles['container-fluid'] : styles['container'];
    const gridClasses = classNames([className, gridTypeClass]);

    return (
      <div className = { gridClasses } >
        { children }
      </div>
    );
  }
}

export default Grid;