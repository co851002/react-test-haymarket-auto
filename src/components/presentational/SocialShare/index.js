import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import hayPropTypes from 'hayPropTypes';
//Componenets
import ButtonGroup from 'presentational/ButtonGroup';
import Button from 'presentational/Button';
import Icon from 'presentational/Icon';
//Style
import style from 'components/SocialShare.scss';
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';

/**
 * Link that also works for external URL's
 */
class SocialShare extends PureComponent {
  /**
   * Implements propTypes().
   *
   * @return {Object} - prop definitions.
   */
  static get propTypes() {
    return {
      types: PropTypes.arrayOf(hayPropTypes.types(['fb', 'tw'])),
      link: PropTypes.string.isRequired,
      text: PropTypes.string,
      fbAppId: PropTypes.number
    };
  }

  /**
  * Implements defaultProps().
  */
  static get defaultProps() {
    return {
      types: ['fb', 'tw']
    };
  }

  /**
   * Create the social link button children .
   * @param {Array} types - list of social share types to display
   * @param {string} text - the share text to incorporate 
   * @param {string} link - the link text to incorporate
   * @param {number} fbAppId - the link text to incorporate
   * @return {fbAppId} - the facebook app id.
   */
  createSocialLinks(types, text, link, fbAppId) {
    const links = types.map((key, index) => {
      switch (key) {
        case 'fb':
          return (
            <Button key = { index } 
              href = { `https://www.facebook.com/dialog/feed?app_id=${fbAppId}&link=${link}&display=popup&redirect_uri=${link}` } 
              target = '_blank'
              buttonClass = { classNames([bootstrap.btnDefault, style.button, style.facebookBg]) } >
              <Icon iconName = 'facebook' />
            </Button>
          );
        case 'tw':
          return (
            <Button key = { index } 
              href = { `https://twitter.com/intent/tweet?text=${text}: ${link}` }
              target = '_blank'
              buttonClass = { classNames([bootstrap.btnDefault, style.button, style.twitterBg]) } >
              <Icon iconName = 'twitter' />
            </Button>
          );
      }
    });

    return links;
  }

  /**
   * Renders a Social Share.
   *
   * @returns {JSX} rendered social share.
   */
  render() {
    const children = this.createSocialLinks(this.props.types, 
      this.props.text, 
      this.props.link,
      this.props.fbAppId);

    return (
      <ButtonGroup>
        { children }
      </ButtonGroup>
    );
  }
}

export default SocialShare;