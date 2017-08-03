// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//Components
import Header from 'containers/Header';
import Footer from 'containers/Footer';
import MobileDetector from 'presentational/MobileDetector';
import { Grid } from 'presentational/Grid';

/**
 * <App /> component.
 */
class App extends Component {
  /**
   * Returns propTypes.
   *
   * @return {Object} - property types of component.
   */
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object
  };

  /**
   * Renders the App component.
   *
   * @return {JSX} - renders the root component with a header and footer.
   */
  render() : React.Element<*> {
    return (
      <div>
        <MobileDetector />
        <Header routerLocation = { this.props.location } />
        <Grid>
          { this.props.children }
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default App;
