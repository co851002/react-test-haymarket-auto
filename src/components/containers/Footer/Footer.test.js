import React from 'react';
import * as Actions from 'actionTypes';
import { Footer } from './index.js';

import style from 'components/FooterMenu.scss';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
const initialState = {
  menus: {
    isOpen: true,
  }
};

const mockStore = configureStore([]);

const props = {
  menu: [{
    mlid: 1,
    text: 'Menu 1',
    path: '/path1',
    children: []
  },{
    mlid: 2,
    text: 'Menu 2',
    path: '/path2',
    children: []
  }]
};

/** @test {Footer} */
describe('<Footer />', () => {
  /**
   * Helper function for tests.
   * @param  {String} [type='shallow'] - method of rendering the component.
   * @param  {callback} [dispatch=callback] - function to use as dispatch action.
   * @return {JSX} - rendered component.
   */
  const prepareFooter = (type = 'shallow', dispatch = () => {}) => {
    const props = {
      dispatch: dispatch
    };

    return global[type](<Footer { ...props } />);
  };

  /** @test {Footer#render} */
  it('should render the footer html tag', () => {
    const wrapper = prepareFooter();
    expect(wrapper.find('footer')).to.have.length(1);
  });

  /** @test {Footer#render} */
  it('should have a Menu in the footer when there are menu items', () => {
    
    const wrapper = mount(
      <Provider store = { mockStore(initialState) }>
        <Footer { ...props } dispatch = { ()=>{} } />
      </Provider>);

    expect(wrapper.find('Menu')).to.have.length(1);
    expect(wrapper.find('Menu').hasClass(style.footerMenu)).to.be.true;
  });

  /** @test {Footer#render} */
  it('should have a Copyright component in the footer', () => {
    const wrapper = prepareFooter();
    expect(wrapper.find('Copyright')).to.have.length(1);
  });

  /** @test {Footer#mapStateToProps} */
  it('should map menu state to props correctly', () => {
    const state = {
      menus: {
        'footer-menu': ['This is fake data for test']
      }
    };
    const result = {
      menu: ['This is fake data for test']
    };
    expect(Footer.mapStateToProps(state)).to.deep.equal(result);
  });

  /** @test {Footer#componentWillMount} */
  it('should fetch footer menu items with FETCH_MENU', () => {

    const dispatchStub = sinon.stub();
    mount(<Provider store = { mockStore(initialState) }>
      <Footer { ...props } dispatch = { dispatchStub } />
    </Provider>
    );
      
    const expected = {
      type: Actions.FETCH_MENU,
      mid: 'footer-menu'
    };

    expect(dispatchStub.called).to.be.true;
    expect(dispatchStub.calledWith(expected));
    
  });

  /** @test {Footer#mapStateToProps} */
  it('should map menu state to props correctly', () => {
    const state = {
      menus: {
        'footer-menu': ['This is fake data for test']
      }
    };
    const result = {
      menu: ['This is fake data for test']
    };
    expect(Footer.mapStateToProps(state)).to.deep.equal(result);
  });

  /** @test {Footer#mapStateToProps} */
  it('should map state to props correctly', () => {
    const state = {
      props: {
        'copyright.text': 'This is fake text data for test',
        'copyright.copytext': 'This is fake copytext data for test',
        'copyright.image': 'This is fake image data for test',
        'copyright.somethingelse': 'This is fake data for test',
        'feedback.label': 'This is fake label data for test',
        'feedback.somethingelse': 'This is fake data for test',
        'feedback.feedbackify': 'This is fake code data for test',
        'feedback.text': 'This is fake text for test',
        'subscribe.cta' : 'This is fake cta data for test',
        'subscribe.text' : 'This is fake text data for test',
        'subscribe.image' : 'This is fake image data for test'
      }
    };
    const result = {
      copyright: {
        'text': 'This is fake text data for test',
        'copytext': 'This is fake copytext data for test',
        'image': 'This is fake image data for test'
      },
      feedback: {
        'text': 'This is fake text for test',
        'label': 'This is fake label data for test',
        'code': 'This is fake code data for test'
      },
      subscribe: {
        'text': 'This is fake text data for test',
        'cta': 'This is fake cta data for test',
        'image': 'This is fake image data for test'
      }
    };
    expect(Footer.mapStateToProps(state)).to.deep.equal(result);
  });
});
