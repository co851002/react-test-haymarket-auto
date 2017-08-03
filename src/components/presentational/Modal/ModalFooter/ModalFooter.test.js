import React from 'react';
import ModalFooter from './index';
//Style
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';

/**
* Test for <ModalFooter /> presentational component.
* @test {ModalFooter}
*/
describe('<ModalFooter />', () => {
  it('should render ModalFooter', () => {
    const wrapper = shallow(<ModalFooter className = 'className' >Child text</ModalFooter>);
    expect(wrapper).to.have.length(1);
    expect(wrapper.find('div').hasClass('className')).to.be.true;
    expect(wrapper.find('div').hasClass(bootstrap.modalFooter)).to.be.true;
    expect(wrapper.find('div').children().text()).to.equal('Child text');
  });
});