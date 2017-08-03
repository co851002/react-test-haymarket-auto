// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
// Components.
import Menu from 'presentational/Menu';
import Copyright from 'presentational/Copyright';
import Feedback from 'presentational/Feedback';
import Subscribe from 'presentational/Subscribe';
import { Grid, Col, Row } from 'presentational/Grid';

// HOC
import { connect } from 'react-redux';
// Actions
import * as Actions from 'actionTypes';
// Style
import style from 'components/Footer.scss';
import footerMenu from 'components/FooterMenu.scss';
import copyright from 'components/Copyright.scss';
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';
import feedback from 'components/Feedback.scss';
import subscribe from 'components/Subscribe.scss';

/**
 * <Footer /> Component.
 */
export class Footer extends Component {
  /**
   * Implements defaultProps().
   *
   * @return {Object} property types.
   * @prop {PropTypes.any} menu - type of menus.
   * @prop {PropTypes.func} dispatch - dunction provided by connect.
   * @prop {PropTypes.any} children - type of children.
   */
  static propTypes = {
    menu: PropTypes.any,
    copyright: PropTypes.any,
    feedback: PropTypes.any,
    subscribe: PropTypes.any,
    dispatch: PropTypes.func,
    children: PropTypes.any
  };

  /**
   * Implements defaultProps().
   *
   * @return {Object} default properties.
   * @prop {Array} menu - array of menu items for the footer menu.
   */
  static defaultProps = {
    menu: [],
    copyright: {},
    feedback: {},
    subscribe: {}
  };

  /**
   * Implements mapStateToProps().
   *
   * @param {Object} state - current state of applicaiton.
   * @returns {Object} - object of properties of this component based on state.
   */
  static mapStateToProps(state : Object) {
    const result = {};
    if (state.menus) {
      result.menu = state.menus['footer-menu'];
    }
    if (state.props) {
      result.copyright = {
        text: state.props['copyright.text'],
        copytext: state.props['copyright.copytext'],
        image: state.props['copyright.image']
      };
      result.feedback = {
        text: state.props['feedback.text'],
        label: state.props['feedback.label'],
        code: state.props['feedback.feedbackify']
      };
      result.subscribe = {
        text: state.props['subscribe.text'],
        cta: state.props['subscribe.cta'],
        image: state.props['subscribe.image']
      };
    }
    return result;
  }

  /**
   * Implmenets componentWillMount().
   *
   * @returns {void}
   */
  componentWillMount() {
    this.props.dispatch({
      type: Actions.FETCH_MENU,
      mids: ['footer-menu']
    });
    this.props.dispatch({
      type: Actions.FETCH_PROPS,
      props: [
        'copyright.text',
        'copyright.copytext',
        'copyright.image',
        'feedback.label',
        'feedback.text',
        'feedback.feedbackify',
        'subscribe.cta',
        'subscribe.text',
        'subscribe.image'
      ]
    });
  }

  /**
   * Renders the footer component.
   *
   * @return {JSX} - renders footer containing the footer menu and other info.
   */
  render() : React.Element<*> | null {
    
    const menuItems = this.props.menu;

    return (
      <footer className = { style.footer }>
        <Grid>
          <Feedback
            className = { feedback.feedback }
            feedbackifyCode = { this.props.feedback.code }
            labelText = { this.props.feedback.label }
            labelClass = { bootstrap.labelBeta }
            text = { this.props.feedback.text } />
          <Row>
            <Col colXs = { 12 } colSm = { 8 } >
              <Row>
                <Col colXs = { 12 } colSm = { 7 } >
                  <Copyright className = { copyright.copyright }  { ...this.props.copyright } />
                </Col>
                <Col colXs = { 12 } colSm = { 5 } >
                  <Menu
                    itemListClass = { footerMenu.footerMenu }
                    items = { menuItems } />                   
                </Col>
              </Row>
            </Col>
            <Col colXs = { 12 } colSm = { 4 } >
              <Subscribe 
                { ...this.props.subscribe }
                className = { subscribe.subscribe } />
            </Col>
          </Row>
        </Grid>
      </footer>
    );
  }
}

export default connect(Footer.mapStateToProps, null, null, {pure:false})(Footer);
