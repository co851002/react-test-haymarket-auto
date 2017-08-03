// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

//Style
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';
import helpers from 'shared/helpers.scss';
//Helpers
import classNames from 'classnames';
// import RetinaImage from 'react-retina-image';
//
import PrintHtml from 'presentational/PrintHtml';

/**
  *	Media React presentational component.
  */
export class Media extends PureComponent {
/**
  *	Props implementation.
  */
  static propTypes = {
    classMedia: PropTypes.string,
    classMediaPosition: PropTypes.string,
    classMediaHeading: PropTypes.string,
    classMediaBody: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    mediaHeadingText: PropTypes.string,
    mediaBodyText: PropTypes.string,
    mediaImage: PropTypes.string
  };

  /**
  * Implements defaultProps().
  */
  static defaultProps = {
    classMediaPosition: bootstrap.mediaLeft,
    classMediaHeading: helpers.textGrayDark,
    classMediaBody: [helpers.textGrayDarker, helpers.textBold]
  };
  
  /**
  * Render
  * @return {ReactElement} markup
  */
  render() : React.Element<*> {
    return (
      <div className = { classNames([ bootstrap.media, this.props.classMedia ]) } >
        <div className = { classNames([this.props.classMediaPosition]) }>
          {
            this.props.mediaImage ? 'retinaComponent or imageComponent?' : <div className = { classNames([bootstrap.mediaObject, helpers.userPlaceholder]) } data-icon = '0' />
          }
        </div>
        <div className = { classNames([bootstrap.mediaBody, this.props.classMediaBody]) }>
          <h5 className = { classNames([bootstrap.mediaHeading, this.props.classMediaHeading]) }> 
            <PrintHtml text = { this.props.mediaHeadingText } />
          </h5>
          <PrintHtml text = { this.props.mediaBodyText } />
        </div>
      </div>
    );
  }
}

export default Media;