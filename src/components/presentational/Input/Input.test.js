import React from 'react';
import Input from 'presentational/Input';
/**
* Test for <Input /> ComponentType component.
* @test {Input}
*/

const props = {
  placeholder: 'placeholderProp',
  inputClasses: 'class1 class2',
  hasAutofocus: true,
  value: 'valueProp',
  name: 'nameProp',
  type: 'text'
};

describe('<Input />', () => {

  it('should render Input', () => {
    const wrapper = shallow(<Input />);
    expect(wrapper).to.have.length(1);
  });

  it('should set an input value', () => {
    
    const onTextChangeMock = sinon.stub();

    const mockEvent = {
      target: {
        value: 'someText'
      }
    };

    const wrapper = mount(<Input 
      onTextChange = { onTextChangeMock } />
    );
    
    const input = wrapper.find('input');
    input.simulate('change', mockEvent);
    
    expect(onTextChangeMock.calledWith('someText'));

  });

  it('should have all the props', () => {
    const wrapper = shallow(<Input { ...props } />);
    expect(wrapper.find(`[type="${props.type}"]`)).to.have.length(1);
    expect(wrapper.find(`[autoFocus="autoFocus"]`)).to.have.length(1);
    expect(wrapper.find(`[name="${props.name}"]`)).to.have.length(1);
    expect(wrapper.find(`[value="${props.value}"]`)).to.have.length(1);
    expect(wrapper.find(`[placeholder="${props.placeholder}"]`)).to.have.length(1);
  });

  it('should have all the classes', () => {
    const wrapper = shallow(<Input { ...props } />);
    expect(wrapper.hasClass(props.inputClasses)).to.equal(true);
  });

});