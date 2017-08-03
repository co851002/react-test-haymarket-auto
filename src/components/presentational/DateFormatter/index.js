// @flow 

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

//components
import PrintHtml from 'presentational/PrintHtml';
//Helpers
import classNames from 'classnames';
import helpers from 'shared/helpers.scss';

/**
  *	DateFormatter React presentational component.
  */
export class DateFormatter extends PureComponent<*,*,void> {
/**
  *	Props implementation.
  */
  static propTypes = {
    date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    class: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]),
    locale: PropTypes.string,
    format: PropTypes.string
  };

  /**
  * Implements defaultProps().
  */
  static defaultProps = {
    class: helpers.textBold,
    locale: 'en-GB', 
    format: 'dd Mmm yyyy h:m'
  };

  /**
   * It returns a formatted date according to the passed locale and the format chosen
   * 
   * @param {timestamp} date - timestamp to format
   * @param {string} locale - localized date and time formats i.e. 'en-US', 'en-GB' See: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
   * @param {string} format - chosen format
   * @returns {string} formatted date
   * 
   * d	Day of the month as digits; no leading zero for single-digit days.
   * dd	Day of the month as digits; leading zero for single-digit days.
   * ddd	Day of the week as a three-letter abbreviation.
   * dddd	Day of the week as its full name.
   * m	Month as digits; no leading zero for single-digit months.
   * mm	Month as digits; leading zero for single-digit months.
   * mmm	Month as a three-letter abbreviation.
   * mmmm	Month as its full name.
   * yy	Year as last two digits; leading zero for years less than 10.
   * yyyy	Year represented by four digits.
   * h	Hours; no leading zero for single-digit hours (12-hour clock).
   * hh	Hours; leading zero for single-digit hours (12-hour clock).
   * H	Hours; no leading zero for single-digit hours (24-hour clock).
   * HH	Hours; leading zero for single-digit hours (24-hour clock).
   * @memberOf DateFormatter
   */
  getFormattedDate(date : string | number , locale : string, format : string) : string {
    
    let result = null;
    const newDate = new Date( parseInt(date) * 1000 );

    switch(format){
      case 'dd Mmm yyyy h:m': {// FORMAT: "27 Nov 2016 20:20"
        result = this.getDefault(newDate, locale);
      } break;

      default: {//if format is provided, but it is no part of the list
        result = this.getDefault(newDate, locale);
      }

    }
  
    return result;
  }

  /**
   * Default format
   * 
   * @param {Date} date - date to format 
   * @param {string} locale - localized date 
   * @returns {string} formatted date
   * 
   * @memberOf DateFormatter
   */
  getDefault(date : Date, locale : string) : string {

    return `${date.getDate()} ${date.toLocaleString(locale, { month: 'short' })} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  }

  /**
  * Render
  * @return {ReactElement} markup
  */
  render() : React.Element<*> | null {
    const { date, locale, format} = this.props;
    return (
        this.props.date ? 
          <span className = { classNames([this.props.class]) } > 
            <PrintHtml text = { this.getFormattedDate(date, locale, format) } /> 
          </span>
          : null
    );
  }
}

export default DateFormatter;