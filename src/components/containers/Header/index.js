// @flow 

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Components
import Logo from 'presentational/Logo';
import Icon from 'presentational/Icon';
import MenuContainer from 'containers/MenuContainer';
import { connect } from 'react-redux';
import { Grid } from 'presentational/Grid';
import Button from 'presentational/Button';
import PrintHtml from 'presentational/PrintHtml';

//Helpers
import classNames from 'classnames';
// Style
import style from 'components/header.scss';
import navFlex from 'shared/flex.scss';
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';
import logo from 'components/Logo.scss';
import loginStyle from 'components/login.scss';
import buttonStyle from 'components/Button.scss';
import main_menu from 'components/MainMenu.scss';

/**
 * <Header /> component.
 */
export class Header extends Component {
  /**
   * Implements propTypes().
   *
   * @type {Object}
   * @property {PropTypes.any} propTypes.menus - menus used in this component.
   * @property {PropTypes.func} propTypes.dispatch - funciton used to dispatch actions.
   * @property {PropTypes.any} propTypes.children - children of the component.
   */
  static propTypes = {
    routerLocation: PropTypes.object,
    toggle: PropTypes.object,
    searchBarReference: PropTypes.string
  };

  /**
   * Implements defaultProps().
   *
   * @prop {string} searchBarReference - searchBar reference
   * @return {Object} - propType object.
   */
  static defaultProps = {
    searchBarReference: 'searchBar',
    toggle: {}
  };

  /**
  *	MapStateToProps implementation.
  * @return {object} new state object
  * @param {object} state object
  */
  static mapStateToProps(state : Object) : {} {
    return {
      toggle: state.toggle
    };
  }

  /**
   * Renders header.
   *
   * @return {JSX} rendered header.
   */
  render() {
    return (
      <header className = { style.header }>
        <Grid>
          <nav className = { classNames([navFlex.navFlex]) } >
            <Logo href = "/" className = { logo.logo } title = "What Car?" alt = "What Car? Logo" />
            <MenuContainer
              routerLocation = { this.props.routerLocation }
              navClasses = { this.props.toggle[this.props.searchBarReference] != null ? main_menu.searchBarActive : '' } 
              searchBarReference = { this.props.searchBarReference } />              
            <div className = { classNames([loginStyle.login, navFlex.navFlexElemIcon]) } >
              <Button
                buttonClass = { classNames([buttonStyle.iconBtn, loginStyle.loginBtn, bootstrap.btnLink]) }>
                <PrintHtml className = { bootstrap.hiddenXs } text = 'Sign In' />
                <Icon iconName = 'user' />
              </Button>
            </div>
          </nav>
        </Grid>
      </header>
    );
  }
}

export default connect(Header.mapStateToProps)(Header);