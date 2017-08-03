// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// HOC
import { connect } from 'react-redux';
import Toggle from 'hoc/Toggle';
import Click from 'hoc/Click';
//components
import Button from 'presentational/Button';
import Icon from 'presentational/Icon';
//Helpers
import classNames from 'classnames';
//Style
import mainMenuStyle from 'components/MainMenu.scss';
import buttonStyle from 'components/Button.scss';
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';

/**
 * MobileMenu component.
 */
export class MobileMenu extends Component {
  ToggleClickButton: Function;

  /**
   * propTypes function
   */
  static propTypes = {
    menuName: PropTypes.string,
    menuClassMobile: PropTypes.string,
    menuIconMobile: PropTypes.object,
    menuTextMobile: PropTypes.string,
    closeIconClassMobile: PropTypes.string,
    closeIcon: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.node,
      PropTypes.string,
    ]),
    itemsMobile: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
    toggle: PropTypes.object
  }

  /**
   * defaultProps function
   */
  static defaultProps = {
    menuClassMobile: mainMenuStyle.mainMenuMobile,
    menuIconMobile: <Icon iconName = 'menu' />,
    closeIconClassMobile: mainMenuStyle.closeX,
    closeIcon: 'close',
    itemsMobile: {}
  };

  /**
   * Constructor function
   * @param {object} props - propss passed
   */
  constructor(props : Object){
    super(props);
    this.ToggleClickButton = Toggle(Click(Button), this.props.menuName); //It wraps Item with the HOC Toggle component. It passes the name of the menu.
  }

  /**
   * It maps the state in the store to props
   * @param {object} state - state from the store
   * @return {object} - the toggle state gets mapped to the prop toggle
   */
  static mapStateToProps(state) : Object {
    return {
      toggle: state.toggle
    };
  }

  /**
   * Renders function
   * @return {void}
   */
  render() : React.Element<*> | null {

    const menuEls = this.props.itemsMobile;

    if(menuEls == null || !Object.keys(menuEls).length){
      return null;
    }

    const ToggleClickButton = this.ToggleClickButton;

    return (
      <div>
        <ToggleClickButton
          buttonText = { this.props.menuTextMobile }
          buttonSuffix = { this.props.menuIconMobile } 
          injectedElemId = { -2 }
          toggleClass = { mainMenuStyle.mainMenuOpen }
          hocOnDocumentDismiss = { true } 
          buttonClass = { classNames([bootstrap.btnLink, mainMenuStyle.hamburgerBtn, buttonStyle.iconBtn]) } />
        <div className = { `${classNames([this.props.menuClassMobile])} ${this.props.toggle[this.props.menuName] != null ? mainMenuStyle.mainMenuOpen : ''}` }>
          <div className = { this.props.closeIconClassMobile } >
            <Icon iconName = { this.props.closeIcon } />
          </div>
          <div className = { mainMenuStyle.mainMenuMobileList } >
            { menuEls }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(MobileMenu.mapStateToProps, null, null, { pure: false })(MobileMenu);