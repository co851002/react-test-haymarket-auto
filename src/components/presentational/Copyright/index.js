// @flow 

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
// Components
import RetinaImage from 'react-retina-image';
/**
 * <Copyright /> component.
 */
class Copyright extends PureComponent {
  /**
   * Implements propTypes().
   *
   * @return {Object} propery types.
   * @prop {PropTypes.string} text - description text for the copyright.
   * @prop {PropTypes.string} copytext - text describing the copyright.
   * @prop {PropTypes.shape} image - image object.
   */
  static propTypes = {
    text: PropTypes.string,
    copytext: PropTypes.string,
    image: PropTypes.shape({
      src: PropTypes.string.isRequired,
      'src@2x': PropTypes.string,
      title: PropTypes.string,
      alt: PropTypes.string
    })
  };

  /**
   * Renders <Copyright /> component.
   *
   * @return {JSX} - rendered Copyright component.
   */
  render() : React.Element<*> | null {
    const {
      text,
      copytext,
      image: image = {},
      ...props
    } = this.props;
    if (!(text || copytext || image.src)) {
      return null;
    }
    const textComponent = text ?
      <div dangerouslySetInnerHTML = { {__html: text} } /> :
      null;
    const copyComponent = copytext ?
      <div>{ copytext }</div> :
      null;
    const imageCompanent = image.src ?
      <RetinaImage src = { [image.src, image['src@2x']] } title = { image.title } alt = { image.alt } /> :
      null;
    return (<div { ...props }>
      { textComponent }
      { imageCompanent }
      { copyComponent }
    </div>);
  }
}

export default Copyright;
