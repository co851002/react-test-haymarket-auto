import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Image from 'presentational/Image';
import imageSrc from 'presentational/Spinner/img/spinner.svg';
import style from 'components/Spinner.scss';

/**
 * Spinner component
 * @returns {ReactElement} the spinner component
 */
export class Spinner extends PureComponent {
  /**
    *	Props implementation.
    */
  static get propTypes() {
    return{
      className: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
      ]),
      src: PropTypes.string,
      height: PropTypes.number,
      width: PropTypes.number,
      margin: PropTypes.number
    };
  }

  /**
   * defaultProps function
   */
  static get defaultProps() {
    return {
      src: imageSrc,
      height: 50,
      width: 50,
      className: style.spinner
    };
  }

  /**
  * Render
  * @return {ReactElement} markup
  */
  render() {
    const {
      src,
      height,
      width,
      className
    } = this.props;

    const spinnerStyle = {};
    spinnerStyle.height = height; 
    spinnerStyle.width = width;

    return (
      <div className = { classNames([className]) } >
        <div style = { spinnerStyle } >
          <Image src = { src } title = 'Spinner' alt = 'Spinner' />
        </div>
      </div>
    );
  }
}

export default Spinner;