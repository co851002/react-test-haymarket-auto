import React from 'react';
import ModalHeader from './index';
//Style
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';

/**
* Test for <ModalHeader /> presentational component.
* @test {ModalHeader}
*/
describe('<ModalHeader />', () => {
  it('should render ModalHeader without close button by default', () => {
    const wrapper = shallow(<ModalHeader text = 'Header text' className = 'className' />);
    expect(wrapper).to.have.length(1);
    expect(wrapper.find('div').hasClass('className')).to.be.true;
    expect(wrapper.find('div').hasClass(bootstrap.modalHeader)).to.be.true;
    expect(wrapper.find('h4').prop('className')).to.include('modal-title');
    expect(wrapper.find('h4').children().text()).to.equal('Header text');
    expect(wrapper.find('button')).to.have.length(0);
  });

  it('should render with close button', () => {
    const wrapper = shallow(<ModalHeader closeButton />);
    expect(wrapper).to.have.length(1);
    expect(wrapper.find('button').hasClass(bootstrap.close)).to.be.true;
  });
});