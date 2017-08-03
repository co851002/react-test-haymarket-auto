import React from 'react';
import Modal from 'presentational/Modal';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ModalHeader from 'presentational/Modal/ModalHeader';
import ModalFooter from 'presentational/Modal/ModalFooter';
//Style
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';
import style from 'components/Modal.scss';

const mockStore = configureStore([]);
const initialState = { toggle: {} };
const store = mockStore(initialState);

/**
* Test for <Modal /> presentational component.
* @test {Modal}
*/
describe('<Modal />', () => {

  it('should render nothing by default', () => {
    const wrapper = shallow(<Modal className = 'className' ><ModalHeader /></Modal>);
    expect(wrapper).to.have.length(1);
    expect(wrapper.find('div')).to.have.length(0);
  });

  it('should render Modal when show prop is true', () => {
    const wrapper = shallow(<Modal show = { true } className = 'className' ><ModalHeader /><ModalFooter /></Modal>);
    expect(wrapper).to.have.length(1);
    expect(wrapper.find('div').at(0).hasClass('className')).to.be.true;
    expect(wrapper.find('div').at(1).hasClass(bootstrap.modalBackdrop)).to.be.true;
    expect(wrapper.find('div').at(2).hasClass(bootstrap.modal)).to.be.true;
    expect(wrapper.find('div').at(2).hasClass(bootstrap.fade)).to.be.true;
    expect(wrapper.find('div').at(2).hasClass(bootstrap.in)).to.be.true;    
    expect(wrapper.find('div').at(2).hasClass(style.modal)).to.be.true; 
    expect(wrapper.find('div').at(3).hasClass(bootstrap.modalDialog)).to.be.true;
    expect(wrapper.find('div').at(4).hasClass(bootstrap.modalContent)).to.be.true;
    expect(wrapper.find('div').at(4).children().at(0).type()).to.equal(ModalHeader);
    expect(wrapper.find('div').at(4).children().at(1).type()).to.equal(ModalFooter);
  });

  it('should call onHide prop when clicking outside modal content and closeOnWindowClick true', () => {
    const onHide = sinon.stub();

    const wrapper = mount(<Provider store = { store }>
      <Modal closeOnWindowClick show = { true } onHide = { onHide } />
    </Provider>);
    expect(wrapper).to.have.length(1);
    const modal = wrapper.find('div').at(2);
    modal.simulate('click');

    expect(onHide.calledOnce).to.equal(true);
  });

  it('should not call onHide prop when clicking outside modal content but closeOnWindowClick false', () => {
    const onHide = sinon.stub();

    const wrapper = mount(<Provider store = { store }>
      <Modal show = { true } onHide = { onHide } closeOnWindowClick = { false } />
    </Provider>);
    expect(wrapper).to.have.length(1);
    const modal = wrapper.find('div').at(2);
    modal.simulate('click');

    expect(onHide.called).to.equal(false);
  });

  it('should call onHide prop when ESC key event received and closeOnWindowEscKey true', () => {
    const onHide = sinon.stub();

    const wrapper = shallow(<Modal closeOnWindowEscKey show = { true } onHide = { onHide } />);
    expect(wrapper).to.have.length(1);
    wrapper.instance().handleKey({keyCode: 27});

    expect(onHide.calledOnce).to.equal(true);
  });

  it('should not call onHide prop when ESC key event received and closeOnWindowEscKey false', () => {
    const onHide = sinon.stub();

    const wrapper = shallow(<Modal show = { true } onHide = { onHide } closeOnWindowEscKey = { false } />);
    expect(wrapper).to.have.length(1);
    wrapper.instance().handleKey({keyCode: 27});

    expect(onHide.calledOnce).to.equal(false);
  });
});