// @flow

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
// Components
import Button from 'presentational/Button';
import RetinaImage from 'react-retina-image';
//Style
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';

/**
 * <Subscribe /> component.
 */
class Subscribe extends PureComponent {
  /**
   * Implements propTypes().
   *
   * @return {Object} propery types.
   * @prop {PropTypes.string} text - description text for the copyright.
   * @prop {PropTypes.string} cta - text describing the cta.
   * @prop {PropTypes.shape} image - image object.
   */
  static propTypes = {
    text: PropTypes.string,
    cta: PropTypes.shape({
      href: PropTypes.string,
      text: PropTypes.string.isRequired
    }),
    image: PropTypes.shape({
      src: PropTypes.string.isRequired,
      'src@2x': PropTypes.string,
      title: PropTypes.string,
      alt: PropTypes.string,
    }),
  };

  /**
   * Renders <Subscribe /> component.
   *
   * @return {JSX} - rendered Subscribe component.
   */
  render() : React.Element<*> | null {
    const {
      text,
      cta: cta = {},
      image: image = {},
      ...props
    } = this.props;

    if (!(text || cta.text || image.src)) {
      return null;
    }
   
    const {
      text : ctaText,
      href: ctaHref,
      ...ctaProps
    } = cta;

    const textComponent = text ? <div>{ text }</div> : null;
    const ctaComponent = ctaText ? 
      <Button
        buttonClass = { classNames([bootstrap.btn, bootstrap.btnPrimary]) }
        { ...ctaProps }
        href = { ctaHref }
        buttonText = { ctaText }  /> : null;
    const imageCompanent = image.src ?
      <RetinaImage src = { [image.src, image['src@2x']] } title = { image.title } alt = { image.alt } /> : null;

    return (<div { ...props }>
      { imageCompanent }
      { textComponent }
      { ctaComponent }
    </div>);
  }
}

export default Subscribe;
