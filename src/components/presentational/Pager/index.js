import React, {Component} from 'react';
import PropTypes from 'prop-types';
// Components
import Icon from 'presentational/Icon';
//Style
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';
import pagerStyle from 'components/Pager.scss';
import iconStyle from 'components/Icon.scss';
// Helpers
import classNames from 'classnames';

/**
 * <Pager /> component.
 */
export class Pager extends Component {
  /**
   * Implements propTypes().
   */
  static get propTypes() {
    return {
      className: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
      ]),
      total: PropTypes.number.isRequired,
      current: PropTypes.number.isRequired,
      limit: PropTypes.number,
      gotoPage: PropTypes.func.isRequired,
      size: PropTypes.oneOf(['sm', 'lg']),
      showFirstLast: PropTypes.bool,
      useIcons: PropTypes.bool,
      previconName: PropTypes.string,
      nexticonName: PropTypes.string,
      firsticonName: PropTypes.string,
      lasticonName: PropTypes.string
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
      limit: 10,
      current: 1,
      useIcons: false,
      previconName: 'angle-right',
      nexticonName: 'angle-left',
      firsticonName: 'arrow-left',
      lasticonName: 'arrow-right'
    };
  }

  /**
   * Call prop funtion with the pev page number.
   * @return {Void} - calls gotoPage prop function.
   */
  handleGoToPrevPage = () => {
    this.props.gotoPage(this.props.current - 1);
  }

  /**
   * Call prop funtion with the next page number.
   * @return {Void} - calls gotoPage prop function.
   */
  handleGoToNextPage = () => {
    this.props.gotoPage(this.props.current + 1);
  }

  /**
   * Call prop function with 1.
   * @return {Void} - calls gotoPage prop function.
   */
  handleGoToFirstPage = () => {
    this.props.gotoPage(1);
  }

  /**
   * Call prop function with total prop.
   * @return {Void} - calls gotoPage prop function.
   */
  handleGoToLastPage = () => {
    this.props.gotoPage(this.props.total);
  }

  /** 
   * Calculates the pager start.
   * This increments when active item is past the m3iddle point of the pager.
   * @return {Void} - calls gotoPage prop function.
   */
  getPagerStart = () => {
    const {
      total,
      current,
      limit
    } = this.props;

    // Calculate start.
    // This increments to keep active item in the middle of the pager.
    let start = Math.max(1, Math.floor(current) - Math.floor(limit / 2));

    // Stop incrementing the start if total is visible.
    // This ensures the pager limit persists until the end. 
    if (current > total -  (limit / 2)) {
      start = Math.floor(total - limit + 1);
    }

    return start;
  }

  /** 
   * Generates all pager items
   * Loops though pager start and end and displayes current pager items.
   * @return {Array} - an Array of pager items
   */
  getPagerItems = () => {
    const {
      current,
      limit
    } = this.props;
    
    // Set pager start and end.
    const pagerStart = this.getPagerStart();
    const pagerEnd = pagerStart + limit - 1;

    let pagerItems = [];
    for (let i = pagerStart; i <= pagerEnd; i++) {
      // handle active item.
      if (current === i) {
        pagerItems.push(
          <li className = { bootstrap.active } key = { `pagerItem-${i}` }>
            <a>{ i }</a>
          </li>
        );
      } else {
        pagerItems.push(
          <li key = { `pagerItem-${i}` }>
            <a onClick = { () => this.props.gotoPage(i) } >{ i }</a>
          </li>
        );
      }
    }

    return pagerItems;
  }

  /**
   * Renders <Pager /> component.
   *
   * @return {JSX} - renders a Pager.
   */
  render () {
    const {
      total,
      current,
      showFirstLast,
      className,
      useIcons,
      size,
      firsticonName,
      previconName,
      nexticonName,
      lasticonName
    } = this.props;

    if (!total) {
      return null;
    }

    const pagerItems = this.getPagerItems();
    const prevDisabled = current === 1 ? true : false;
    const nextDisabled = current === total ? true : false;
    const sizeClass = size ? `pagination-${size}` : null;
    const prevBtn = useIcons ? <Icon className = { iconStyle.autoHeight } size = 'small' iconName = { previconName } /> : 'Prev';
    const nextBtn = useIcons ? <Icon className = { iconStyle.autoHeight } size = 'small' iconName = { nexticonName } /> : 'Next';
    const firstBtn = useIcons ? <Icon className = { iconStyle.autoHeight } size = 'small' iconName = { firsticonName } /> : 'First';
    const lastBtn = useIcons ? <Icon className = { iconStyle.autoHeight } size = 'small' iconName = { lasticonName } /> : 'Last';

    return (
      <ul className = { classNames([bootstrap.pagination, bootstrap[sizeClass], pagerStyle[sizeClass], pagerStyle.pagination, className]) }>
        { showFirstLast ? 
          <li className = { prevDisabled ? classNames([ pagerStyle.disabled, bootstrap.disabled]) : null }>
            <a onClick = { this.handleGoToFirstPage } >{ firstBtn }</a>
          </li> : null
        }
        <li className = { prevDisabled ? classNames([ pagerStyle.disabled, bootstrap.disabled]) : null }>
          <a onClick = { !prevDisabled ? this.handleGoToPrevPage : null } >{ prevBtn }</a>
        </li> 
        { pagerItems }
        <li className = { nextDisabled ? classNames([ pagerStyle.disabled, bootstrap.disabled]) : null }> 
          <a onClick = { !nextDisabled ? this.handleGoToNextPage : null } >{ nextBtn }</a>
        </li>
        { showFirstLast ? 
          <li className = { nextDisabled ? classNames([ pagerStyle.disabled, bootstrap.disabled]) : null }> 
            <a onClick = { this.handleGoToLastPage } >{ lastBtn }</a>
          </li> : null
        } 
      </ul>
    );
  }
}

export default Pager;