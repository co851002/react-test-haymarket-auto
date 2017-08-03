import React from 'react';
//Style
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';
import Label from './index';

describe('<Label />', () => {
  /**
   * Prepare Label component for testing.
   *
   * @param  {Object} [props={}] properties for component.
   * @param  {String} [method='shallow'] render method to use.
   * @return {Object} rendered JSX object.
   */
  const prepareLabel = (props = {}, method = 'shallow') => {
    return global[method](<Label { ...props } />);
  };

  it('should renders Label', () => {
    const label = shallow(<Label />);
    expect(label).to.have.length(1);
  });

  it('should have a label class', () => {
    const wrapper = mount(<Label> { 'child' } </Label>);
    expect(wrapper.hasClass(bootstrap.label)).to.equal(true);
  });

  it('should not render anything without data', () => {
    const wrapper = prepareLabel();
    expect(wrapper.type()).to.be.null;
  });

  it('should render children if  set', () => {
    const wrapper = prepareLabel({
      children: 'Some fake text'
    });
    const div = wrapper.find('div').first().find('div');
    expect(div).to.have.length(1);
    expect(div.text()).to.equal('Some fake text');
  });
});