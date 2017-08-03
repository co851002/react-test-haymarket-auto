import React from 'react';
import ModalBody from './index';
//Style
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';

/**
* Test for <ModalBody /> presentational component.
* @test {ModalBody}
*/
describe('<ModalBody />', () => {
  it('should render ModalBody', () => {
    const wrapper = shallow(<ModalBody className = 'className' >Child text</ModalBody>);
    expect(wrapper).to.have.length(1);
    expect(wrapper.find('div').hasClass('className')).to.be.true;
    expect(wrapper.find('div').hasClass(bootstrap.modalBody)).to.be.true;
    expect(wrapper.find('div').children().text()).to.equal('Child text');
  });
});