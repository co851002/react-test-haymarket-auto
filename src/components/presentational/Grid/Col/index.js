import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from 'components/Grid.scss';
import hayPropTypes, { viewports } from 'hayPropTypes';
import { getResponsiveClasses } from '../gridFunctions';

/**
 * This is the function callback we pass to the custom proptypes function checker 'checkRelatedProp' used 
 * for checking the offset props
 * @param {*} prop - prop to check (xsOffset, smOffset, mdOffset, lgOffset)
 * @param {*} relatedProp - related prop to check (colXs, colSm, colMd, colLg)
 * @return {boolean} -
 */
export const checkSumOffsetAndColCallback = (prop, relatedProp) => {
  return (prop + relatedProp) > 12 ? false : true;
};
/**
  *	Col React presentational component.
  */
class Col extends Component {
  /**
   *  Props implementation
   *  The following Flexbox properties have been apllied to the Cols.
   *  start: column be aligned horzontally to the the left.
   *  center: column be aligned horzontally in the middle.
   *  end: column be aligned horzontally to the right.
   *  endbaseline: column be aligned such as its baselines align.
   *  stretch: column be stretch to fill the container vertically but still respect min-width/max-width.
   *  first: column will be first in the row.
   *  last: column will be last in the row.
   *  order: specifies a particular order for that column.
   */
  static get propTypes() {
    return{
      className: PropTypes.string,
      children: PropTypes.any,
      style: PropTypes.object,
      colXs: PropTypes.oneOfType([
        PropTypes.oneOf(['hide']),
        hayPropTypes.numberInRange(1,12)
      ]),
      colSm: PropTypes.oneOfType([
        PropTypes.oneOf(['hide']),
        hayPropTypes.numberInRange(1,12)
      ]),
      colMd: PropTypes.oneOfType([
        PropTypes.oneOf(['hide']),
        hayPropTypes.numberInRange(1,12)
      ]),
      colLg: PropTypes.oneOfType([
        PropTypes.oneOf(['hide']),
        hayPropTypes.numberInRange(1,12)
      ]),
      xsOffset: PropTypes.oneOfType([
        hayPropTypes.checkRelatedProp((props, propsName, componentName, relatedPropName) => {
          return checkSumOffsetAndColCallback(props[propsName], props[relatedPropName]);
        }, 'colXs', 'The sum of xsOffset and colXs has to be 12'),
        hayPropTypes.numberInRange(0,11),
      ]),
      smOffset: PropTypes.oneOfType([
        hayPropTypes.checkRelatedProp((props, propsName, componentName, relatedPropName) => {
          return checkSumOffsetAndColCallback(props[propsName], props[relatedPropName]);
        }, 'colSm', 'The sum of smOffset and colSm has to be 12'),
        hayPropTypes.numberInRange(0,11),
      ]),
      mdOffset: PropTypes.oneOfType([
        hayPropTypes.checkRelatedProp((props, propsName, componentName, relatedPropName) => {
          return checkSumOffsetAndColCallback(props[propsName], props[relatedPropName]);
        }, 'colMd', 'The sum of mdOffset and colMd has to be 12'),
        hayPropTypes.numberInRange(0,11),
      ]),
      lgOffset: PropTypes.oneOfType([
        hayPropTypes.checkRelatedProp((props, propsName, componentName, relatedPropName) => {
          return checkSumOffsetAndColCallback(props[propsName], props[relatedPropName]);
        }, 'colLg', 'The sum of lgOffset and colLg has to be 12'),
        hayPropTypes.numberInRange(0,11),
      ]),
      autoWidth: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(viewports),
        PropTypes.arrayOf(hayPropTypes.types(viewports))
      ]),
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
      baseline: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(viewports),
        PropTypes.arrayOf(hayPropTypes.types(viewports))
      ]),
      stretch: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(viewports),
        PropTypes.arrayOf(hayPropTypes.types(viewports))
      ]),
      first: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(viewports),
        PropTypes.arrayOf(hayPropTypes.types(viewports))
      ]),
      last: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(viewports),
        PropTypes.arrayOf(hayPropTypes.types(viewports))
      ]),
      order: PropTypes.shape({
        xs: hayPropTypes.numberInRange(1,12),
        sm: hayPropTypes.numberInRange(1,12),
        md: hayPropTypes.numberInRange(1,12),
        lg: hayPropTypes.numberInRange(1,12)
      }),
    };
  }
  /**
   * defaultProps implementation.
   */
  static get defaultProps(){
    return{
      xsOffset: 0,
      smOffset: 0,
      mdOffset: 0,
      lgOffset: 0
    };
  }

  /**
   *	A props mapping object for offsetting columns.
   * @return {Object}
   *   - An object of prop offset keys and style classes.
   */
  getOffsetClassesMap = () => {
    return {
      xsOffset: 'col-offset-xs',
      smOffset: 'col-offset-sm',
      mdOffset: 'col-offset-md',
      lgOffset: 'col-offset-lg'
    };
  }

  /**
   *	A props mapping object for sizing columns.
   * @return {Object}
   *   - An object of prop size keys and style classes.
   */
  getSizeClassesMap = () => {
    return {
      colXs: 'col-xs',
      colSm: 'col-sm',
      colMd: 'col-md',
      colLg: 'col-lg'
    };
  }

  /**
   * Gets the grid column order classes for each Col.
   * Loops over the order object and returns styles bases on prop keys and values.
   * @return {Array}
   * - An array of style classes to be applied.
   */
  getOrderClasses = () => {
    return Object.keys(this.props.order).map( (item) => 
      styles[`col-order-${item}-${this.props.order[item]}`]
    );
  
  }

  /**
   * Gets the grid column classes.
   * Loops over all the props then aplly the relavent column classes.
   * @return {Array}
   * - An array of style classes to be applied.
   */
  getColumnClasses = () => {
    const classes = [];
    
    for (var prop in this.props) { 
      switch (prop) {
        // Column size classes.
        case 'colXs':
        case 'colSm':
        case 'colMd':
        case 'colLg':        
          // Set column size.
          if (typeof this.props[prop] === 'number') {
            classes.push(styles[`${this.getSizeClassesMap()[prop]}-${this.props[prop]}`]);
          }
          // Apply hide class. This must go after applied column size.
          if (this.props[prop] === 'hide') {
            classes.push(styles[`${this.getSizeClassesMap()[prop]}-hide`]);
          }
          break;
        // Offset classes.
        case 'xsOffset':
        case 'smOffset':
        case 'mdOffset':
        case 'lgOffset':
          if (this.props[prop] > 0) {
            classes.push(styles[`${this.getOffsetClassesMap()[prop]}-${this.props[prop]}`]);
          }
          break;
        // AutoWidth classes.
        case 'autoWidth' :
          classes.push(getResponsiveClasses('col', 'auto', this.props.autoWidth));
          break;
        // Alignment classes.
        case 'start':
        case 'end' :
        case 'center':
        case 'baseline':
        case 'stretch':
          classes.push(getResponsiveClasses('col', prop, this.props[prop]));
          break;
        // First and Last class.
        case 'first' :
        case 'last' :
          classes.push(getResponsiveClasses('col', prop, this.props[prop]));
          break;
      }
    }

    // Order classes.
    if (this.props.order) {  
      classes.push(this.getOrderClasses());
    }
    
    return classes;
  }

  /**
   * Render
   * @return {ReactElement} markup
   */ 
  render() {
    const columnClasses = this.getColumnClasses();
    const classes = classNames([this.props.className, columnClasses]);

    return (
      <div style = { this.props.style } className = { classes } >
        { this.props.children }
      </div>
    );
  }
}

export default Col;