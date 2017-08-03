import React from 'react';
import Button from './index';

describe('<Button />', () => {

  const props = {
    buttonText: 'someButtonText',
    buttonSuffix: <span data-icon = { '0' } />,
    buttonClass: 'test-class',
  };


  it('should NOT render when there are no buttonText and buttonSuffix', () => {
    const wrapper = shallow(
      <Button />
    );
    expect(wrapper.find('button')).to.have.length(0);
  });

  it('should have correct values for each props provided', () => {
    const wrapper = shallow(
      <Button 
        buttonText = { props.buttonText }
        buttonSuffix = { props.buttonSuffix }
        buttonClass = { props.buttonClass } />
    );

    expect(wrapper.instance().props.buttonText).to.equal(props.buttonText);
    expect(wrapper.instance().props.buttonSuffix).to.equal(props.buttonSuffix);
    expect(wrapper.instance().props.buttonClass).to.equal(props.buttonClass);
    
  });

  it('should render button element with button text and classname', () => {
    const wrapper = render(
      <Button { ...props } />
    );
    
    expect(wrapper.find('button').text()).to.equal('someButtonText');
    expect(wrapper.find('button')).to.have.length(1);
    expect(wrapper.find('button').hasClass('test-class')).to.equal(true);
  });  

  it('should render an <a> tag with button text when href is set', () => {
    const props = {
      'buttonText': 'someButtonText',
      href: 'www.somelink.com',
    };
    const wrapper = render(
      <Button { ...props } />
    );
    expect(wrapper.find('a').text()).to.equal('someButtonText');
    expect(wrapper.find('a')).to.have.length(1);
  });

  it('should render a type attribute when <button> renders', () => {
    const props = {
      'buttonText': 'someButtonText',
      'buttonType': 'reset'
    };
    const wrapper = render(
      <Button { ...props } />
    );

    expect(wrapper.find('button')[0].attribs.type).to.equal('reset');
  });

});