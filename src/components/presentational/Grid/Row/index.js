import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hayPropTypes, { viewports } from 'hayPropTypes';
import classNames from 'classnames';
import styles from 'components/Grid.scss';
import { getResponsiveClasses } from '../gridFunctions';

/**
 *	Row React presentational component.
 */
class Row extends Component {
  /**
   *	Props implementation.
   *  The following Flexbox container properties have been apllied to the Row component so that they apply to all child columns.
   *  start: columns are aligned horzontally to the the left.
   *  center: columns are aligned horzontally in the middle.
   *  end: columns are aligned horzontally to the right.
   *  top: columns are aligned vertically at the top.
   *  middle: columns are aligned vertically in the middle.
   *  bottom: columns are aligned vertically at the bottom.
   *  around: columns are distributed with equal space.
   *  between: columns are evenly distributed. The first line is at the start of the container while the last one is at the end.
   *  reverse: columns are in reverse order.
   */
  static get propTypes() {

    return{
      className: PropTypes.string,
      children: hayPropTypes.childrenOfTypes('Col'),
      style: PropTypes.object,
      start: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(viewports),
        PropTypes.arrayOf(hayPropTypes.types(viewports))
      ]),
      center: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(viewports),
        PropTypes.arrayOf(hayPropTypes.types(viewports))
      ]),
      end: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(viewports),
        PropTypes.arrayOf(hayPropTypes.types(viewports))
      ]),
      top: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(viewports),
        PropTypes.arrayOf(hayPropTypes.types(viewports))
      ]),
      middle: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(viewports),
        PropTypes.arrayOf(hayPropTypes.types(viewports))
      ]),
      bottom: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(viewports),
        PropTypes.arrayOf(hayPropTypes.types(viewports))
      ]),
      around: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(viewports),
        PropTypes.arrayOf(hayPropTypes.types(viewports))
      ]),
      between: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(viewports),
        PropTypes.arrayOf(hayPropTypes.types(viewports))
      ]),
      reverse: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(viewports),
        PropTypes.arrayOf(hayPropTypes.types(viewports))
      ])
    };
  }

  /**
   *	A props mapping array for alignment classes.
   * @return {Array}
   *   - An array of row alignment types.
   */
  getAlignmentKeys = () => {
    return [
      'top',
      'middle',
      'bottom',
      'around',
      'between',
      'start',
      'center',
      'end',
      'reverse'
    ];
  }

  /**
   * Gets the grid row classes for alignment of rows.
   * Filters out all props by alignment keys using getAlignmentKeys().
   * @return {Array}
   * - A style class.
   */
  getRowAlignmentClasses = () => {
    return this.getAlignmentKeys()
      .filter(item => this.props[item]).map((item) => getResponsiveClasses('row', item, this.props[item]));
  }

 /**
  * Render
  * @return {ReactElement} markup
  */ 
  render() {
    if (!this.props.children) {
      return null;
    }
    
    const alignmentClasses = this.getRowAlignmentClasses();
    const rowClasses = classNames([this.className, styles.row, alignmentClasses, this.props.className]);

    return (
      <div style = { this.props.style } className = { rowClasses }>
        { this.props.children }
      </div>
    );
  }
}

export default Row;