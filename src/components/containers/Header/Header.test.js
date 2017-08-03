import React from 'react';
import { Header } from './index.js';

//Style
import style from 'components/header.scss';

/**
 * Tests for Header component.
 * @test  {Header}
 */
describe('<Header />', () => {

  it('should render the header html tag', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('header')).to.have.length(1);
  });

  it('should have css modules class present', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('header').hasClass(style.header)).to.be.true;
  });

  it('should have a MenuContainer', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('Connect(MenuContainer)')).to.have.length(1);
  });
  
  it('should have the text Sign In ', () => {
    const wrapper = shallow(<Header />);  
    expect(wrapper.find('PrintHtml').node.props.text).to.equal('Sign In');
  });

  it('should have a Logo ', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('Logo')).to.have.length(1);
  });

  it('should have all the props ', () => {
    const props = {
      routerLocation: {},
      toggle: { 'searchBar': -1 },
      searchBarReference: 'searchBar'
    };

    const wrapper = shallow(<Header { ...props } />);
    // NOTE: When called on a shallow wrapper, .prop(key) will return values for props on the root node that the component renders, not the component itself. To return the props for the entire React component, use wrapper.instance().props
    expect(wrapper.instance().props.routerLocation).to.equal(props.routerLocation);
    expect(wrapper.instance().props.toggle).to.equal(props.toggle);
    expect(wrapper.instance().props.searchBarReference).to.equal(props.searchBarReference);
  });

  it('should mapStateToProps correctly', () => {
    const state = {
      toggle: {},
      anotherState: false
    };
    expect(Header.mapStateToProps(state)).to.deep.equal( { toggle: {} } );
  });

});