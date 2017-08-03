import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from 'presentational/Icon';
import styles from 'components/Rating.scss';

/**
 * <Rating /> component.
 * @return {JSX | null} - react component render.
 */
class Rating extends PureComponent {
  /**
    *	Props implementation.
    */
  static propTypes = {
    ratedValue: PropTypes.number.isRequired,
    iconName: PropTypes.string
  };

  /**
   * Implements defaultProps().
   *
   * @return {Object} - propType object.
   * @prop {string} iconName - An icon ascii code
   */
  static defaultProps = {
    iconName: 'star1' // defaults to star
  }

  /**
   * Gets an array of icon nodes with active classes bases on ratedValue prop.
   * @return {Array} - an array of icons.
   */
  getRatingItems = () => {
    const iconNodes = [];
    const {
      ratedValue,
      iconName
    } = this.props;

    for (let i = 1; i <= 5; i++) {
      // Apply active class.
      const activeClass = i <= ratedValue ? styles.active : '';

      iconNodes.push(
        <Icon
          size = 'large'
          key = { `rated-icon-${i}` }
          iconName = { iconName }
          className = { activeClass } />
      );
    }

    return iconNodes;
  }

  /**
  * Render
  * @return {ReactElement} markup
  */
  render() {
    if (this.props.ratedValue === null) {
      return null;
    }

    return (
      <div className = { styles.rating } >
        {this.getRatingItems()}
      </div>
    );
  }
}

export default Rating;
