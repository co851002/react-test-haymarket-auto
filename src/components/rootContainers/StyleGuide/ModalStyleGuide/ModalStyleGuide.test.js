import React from 'react';
import ModalStyleGuide from './index';
import ModalHeader from 'presentational/Modal/ModalHeader';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
const initialState = { show: { 'default' : false} };
const store = mockStore(initialState);

/**
 * Test for <ModalStyleGuide /> root container.
 * @test {ModalStyleGuide}
 */
describe('<ModalStyleGuide/>', () => {
  it('should open a modal when button clicked', () => {
    const wrapper = mount(<Provider store = { store } >
      <ModalStyleGuide />
    </Provider>);
    expect(wrapper.find(ModalHeader)).to.have.length(0);
    wrapper.find('Button').at(0).simulate('click');
    expect(wrapper.find(ModalHeader)).to.have.length(1);
  });

  it('should close a modal when close button in header clicked', () => {
    const wrapper = mount(<Provider store = { store } >
      <ModalStyleGuide />
    </Provider>);
    wrapper.find('Button').at(0).simulate('click');
    expect(wrapper.find(ModalHeader)).to.have.length(1);
    wrapper.find('button').at(1).simulate('click');
    expect(wrapper.find(ModalHeader)).to.have.length(0);
  });

  it('should close a modal when close button in footer clicked', () => {
    const wrapper = mount(<Provider store = { store } >
      <ModalStyleGuide />
    </Provider>);
    wrapper.find('Button').at(0).simulate('click');
    expect(wrapper.find(ModalHeader)).to.have.length(1);
    wrapper.find('button').at(2).simulate('click');
    expect(wrapper.find(ModalHeader)).to.have.length(0);
  });

  it('should close a modal when save button in footer clicked', () => {
    const wrapper = mount(<Provider store = { store } >
      <ModalStyleGuide />
    </Provider>);
    wrapper.find('Button').at(0).simulate('click');
    expect(wrapper.find(ModalHeader)).to.have.length(1);
    wrapper.find('button').at(3).simulate('click');
    expect(wrapper.find(ModalHeader)).to.have.length(0);
  });
});


