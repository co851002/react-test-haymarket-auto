import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'presentational/Grid';
import Rating from 'presentational/Rating';
import Image from 'presentational/Image';
import PrintHtml from 'presentational/PrintHtml';
import VoteButton from 'rootContainers/VoteButton';
import VoteAlert from 'rootContainers/VoteAlert';

import teasersStyle from 'components/teasersStyle.scss';

const teasers = {
  type: 'REVIEWS',
  items: [{
    nid: 1,
    carType: 'Mercedes',
    teaserTitle: 'New Mercedes A-Class Saloon – everything you need to know',
    path: '/advice/title-article-1',
    teaserCopy: '<p>The Mercedes Concept A previews next year’s A-Class Saloon and the fourth-generation A-Class hatchback. Here\'s what to expect...</p>',
    image: {
      'src': 'http://whatcar.media/jpg/85/0/0/640/426/0/0/0/0/0/center/0/0/0/0/0/images/uploads/carousels/fa3a848996a565dc7a06b6ac4f63ea82f50a18ec.jpg',
      'src@2x': 'http://whatcar.media/jpg/85/0/0/640/426/0/0/0/0/0/center/0/0/0/0/0/images/uploads/carousels/fa3a848996a565dc7a06b6ac4f63ea82f50a18ec.jpg',
    },
    rating: 3
  },
  {
    nid: 2,
    carType: 'Volkswagen',
    teaserTitle: 'New Volkswagen ID Crozz concept previews electric SUV',
    path: '/advice/title-article-2',
    teaserCopy: '<p>Volkswagen has revealed details of its latest ID concept car ahead of its launch at the Shanghai motor show.</p>',
    image: {
      'src': 'http://whatcar.media/jpg/85/0/0/640/426/0/0/0/0/0/center/0/0/0/0/0/images/uploads/carousels/339ff94be29c8224fddf5b54463f8546aa21325b.jpg',
      'src@2x': 'http://whatcar.media/jpg/85/0/0/640/426/0/0/0/0/0/center/0/0/0/0/0/images/uploads/carousels/339ff94be29c8224fddf5b54463f8546aa21325b.jpg',
    },
    rating: 5
  },
  {
    nid: 345,
    carType: 'Citroën',
    teaserTitle: 'Citroën C5 Aircross to launch next year',
    path: '/advice/title-article-3',
    teaserCopy: '<p>BMW\'s new 5 Series saloon scores highly in safety tests, but the Fiat Doblo people carrier disappoints.</p>',
    image: {
      'src': 'http://whatcar.media/jpg/85/0/0/640/426/0/0/0/0/0/center/0/0/0/0/0/images/uploads/carousels/8c0cd2a7c3cebf10e7d909792f4e2ccb71972bd2.jpg',
      'src@2x': 'http://whatcar.media/jpg/85/0/0/640/426/0/0/0/0/0/center/0/0/0/0/0/images/uploads/carousels/8c0cd2a7c3cebf10e7d909792f4e2ccb71972bd2.jpg',
    },
    rating: 4
  },
  {
    nid: 5690,
    carType: 'Skodas',
    teaserTitle: 'Details of Skodas first ever electric car revealed',
    path: '/advice/title-article-4',
    teaserCopy: '<p>The May issue of What Car? magazine is now on sale; all this and more inside.</p>',
    image: {
      'src': 'http://whatcar.media/jpg/85/0/0/640/426/0/0/0/0/0/center/0/0/0/0/0/images/uploads/carousels/f4f4b7f05796733e3a9a1017ef78e4f3d58114ae.jpg',
      'src@2x': 'http://whatcar.media/jpg/85/0/0/640/426/0/0/0/0/0/center/0/0/0/0/0/images/uploads/carousels/f4f4b7f05796733e3a9a1017ef78e4f3d58114ae.jpg',
    },
    rating: 1
  }]
};



/**
 * <Teasers /> component.
 */
class Teasers extends Component {
  'use strict';

  /**
   * Implements propTypes().
   * @return {Object} - propType object.
   */
  static propTypes = {
    handleOnClick: PropTypes.func,
    handleOnItemActive: PropTypes.func,
    voteCount:PropTypes.func,
    active: PropTypes.string,
    item: PropTypes.func
  };


  /**
   * Properties.
   * @param {object} props - a props array
   * @return {Void} - new state
   */
  props: {};
  /**
   * Constructor.
   * @param {array} props - a props array
   * @return {Void} - new state
   */
  constructor(props) {
    super(props);
    this.state = {
      voteCount: 0,
      activeItem: null
    };

    // This binding is necessary to make `this` work in the callback
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  /**
   * Handles vote button state
   * @return {void}
   * @param {function} item - Teaser item
   */
  handleOnItemActive(item) {
    this.setState({ activeItem: item });
  }

  /**
   * Handles click event
   * @return {void}
   */
  handleOnClick() {
    this.setState({ voteCount: this.state.voteCount + 1 });

  }

  /**
   * Handles vote count
   * @return {void}
   */
  voteCounter() {
    if (this.state.voteCount >= 3) {
      //window.scrollTo(0,60),

      setTimeout(() =>
      this.setState({
        voteCount: 3
      }), 1000);
      return (
        <VoteAlert />
      );
    } else {
      return null;
    }

  }

  /**
   * Renders the Teasers component.
   *
   * @return {JSX} - rendered Teasers page.
   */
  render() : React.Element<*> {
    const teaserType = teasers['type'];
    const elipsisRegex = /[^\. ]+\.{3}/;


    return (
      <div className = { teasersStyle.teaserWrapper }>
        { this.voteCounter() }
        <Grid>
          <Row>
            {
                teasers.items.map((item, index) =>
                  <Col key = { item.nid } colXs = { 12 } colSm = { 6 } colMd = { 3 }  colLg = { 3 } className = { teasersStyle.teaser } >
                    <span className = { teasersStyle.type }>{teaserType}</span>
                    <a href = { item.path }>
                      <Image src = { item.image.src } title = { item.carType } alt = { item.carType }  />
                      <h2 className = { teasersStyle.car }> { item.carType }
                        <br />
                        <span className = { teasersStyle.title }>{ item.teaserTitle }</span>
                      </h2>
                      <Rating className = { teasersStyle.rating } ratedValue = { item.rating } />
                      <div className = { teasersStyle.copyWrapper }>
                        <PrintHtml className = { teasersStyle.copy } text = { item.teaserCopy.replace(elipsisRegex,'') } />
                        <span className = { teasersStyle.more }>…</span>
                      </div>
                    </a>
                    <VoteButton
                      key = { index } item = { item }
                      onClick = { this.handleOnClick  }
                      onItemActive = { this.handleOnItemActive.bind(this) }
                      active = { item === this.state.activeItem } />
                  </Col>
                )
            }
          </Row>
        </Grid>
      </div>
    );

  }
}

export default Teasers;
