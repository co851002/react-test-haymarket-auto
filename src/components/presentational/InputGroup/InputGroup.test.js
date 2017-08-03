import React from 'react';
import InputGroup from 'presentational/InputGroup';
import Button from 'presentational/Button';
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';
import Icon from 'presentational/Icon';

const props = {
  type: 'text',
  placeholder: 'placeholderFake',
  inputGroupClasses: 'fakeClass',
  hasAutofocus: true,
  internalIconName: '',
  btnText: 'TEXTFAKE',
  sizeLg: true,
  prefix: {},
  suffix: 'goodbye',
  label: 'testlabel'
};

const icon = <Icon iconName = { 'close' } />;
/**
* Test for <InputGroup /> presentational component.
* @test {InputGroup}
*/
describe('<InputGroup />', () => {
  it('should render InputGroup', () => {
    const wrapper = shallow(<InputGroup />);
    expect(wrapper).to.have.length(1);
  });

  it('should have all the props', () => {
    const wrapper = shallow(<InputGroup { ...props } />);
    expect(wrapper.find(`[type="${props.type}"]`)).to.have.length(1);
    expect(wrapper.find('Input').prop('hasAutofocus')).to.equal(true);
    expect(wrapper.find('button').find('Icon')).to.have.length(0);
    expect(wrapper.find(`[type="${props.type}"]`)).to.have.length(1);
    expect(wrapper.find(`[placeholder="${props.placeholder}"]`)).to.have.length(1);
  });

  it('should have all the classes', () => {
    const wrapper = shallow(<InputGroup { ...props } />);

    expect(wrapper.find('div').at(1).hasClass(bootstrap.inputGroup)).to.equal(true);
    expect(wrapper.find('div').at(1).hasClass(bootstrap.inputGroupLg)).to.equal(true);
    expect(wrapper.find('div').at(1).hasClass(props.inputGroupClasses)).to.equal(true);
  });

  it('should render a <label> element with prop value', () => {
    const wrapper = shallow(<InputGroup { ...props } />);
    expect(wrapper.find('label').text()).to.equal(props.label);
  });

  describe('getGroupPrefixSuffix() function', () => {
    it('should render undefined when no prop is passed.', () => {
      const wrapper = mount(<InputGroup  />);
      const result = wrapper.instance().getGroupPrefixSuffix();
      expect(result).to.equal(undefined);
    });

    it('should render a span with inputGroupBtn class when <Button> component is passes.', () => {
      const wrapper = shallow(<InputGroup />);
      const result = wrapper.instance().getGroupPrefixSuffix(<Button />);
      expect(result.props.className).to.equal(bootstrap.inputGroupBtn);
    });

    it('should render a span with inputGroupAddon class when a string, reactComponent (not button), element  or number is passed', () => {
      const wrapper = shallow(<InputGroup />);
      const result1 = wrapper.instance().getGroupPrefixSuffix(icon);
      const result2 = wrapper.instance().getGroupPrefixSuffix('hello');
      const result3 = wrapper.instance().getGroupPrefixSuffix('<div>Hello</div>');
      const result4 = wrapper.instance().getGroupPrefixSuffix(234);

      expect(result1.props.className).to.equal(bootstrap.inputGroupAddon);
      expect(result2.props.className).to.equal(bootstrap.inputGroupAddon);
      expect(result3.props.className).to.equal(bootstrap.inputGroupAddon);
      expect(result4.props.className).to.equal(bootstrap.inputGroupAddon);
    });


    it('should render a span with inputGroupAddon class for each item in the props array', () => {
      const propsArray = [2, icon, 'some string', icon];
      const wrapper = shallow(<InputGroup />);

      const result = wrapper.instance().getGroupPrefixSuffix(propsArray);

      for (var i = 0; i < propsArray.length; i++) {
        expect(result[i].props.className).to.equal(bootstrap.inputGroupAddon);
      }
    });

  });

  it('should set an input value', () => {
    const mockEvent = {
      target: {
        value: 'someText'
      }
    };

    const wrapper = mount(<InputGroup />);
    
    const input = wrapper.find('input');
    input.simulate('change', mockEvent);
    
    expect(input.get(0).value).to.equal(mockEvent.target.value);
  });

  it('should have the initial state empty because the input component is now controlled by Input component', () => {
    const wrapper = shallow(<InputGroup { ...props } />);
    expect(wrapper.state('inputValue')).to.equal('');
  });  

  describe('with internal icon x that clears the text in the input tag', () => {
    it('should have an internal icon with inputWithClearText = true', () => {
      const wrapper = shallow(<InputGroup inputWithClearText internalIconName = { 'close' } />);
      wrapper.setState({inputValue: 'hello'});
      expect(wrapper.find('button').find('Icon').prop('iconName')).to.equal('close');
    });

    it('shouldn\'t have the X clear text icon when inputWithClearText = true and inputValue state has empty value', () => {
      const wrapper = shallow(<InputGroup inputWithClearText />);
      wrapper.setState({inputValue : ''});
      expect(wrapper.find('button').find('Icon')).to.have.length(0);
    });

    it('should have the X clear text icon with inputWithClearText = true and inputValue state has a value', () => {
      const wrapper = shallow(<InputGroup inputWithClearText />);
      wrapper.setState({inputValue : 'someText'});
      expect(wrapper.find('button').find('Icon').prop('iconName')).to.equal('close');
    });

    it('should update the state and clear the input text when the icon X is clicked after some text has been inserted', () => {
      const mockEvent = {
        target: {
          value: 'someText'
        }
      };

      const wrapper = mount(<InputGroup inputWithClearText />);
      
      const input = wrapper.find('input');
      input.simulate('change', mockEvent);
      expect(wrapper.state('inputValue')).to.equal(mockEvent.target.value); //update state
      expect(input.get(0).value).to.equal(mockEvent.target.value);

      const x = wrapper.find('svg');
      expect(x).to.have.length(1);
      
      x.simulate('click', '');
      expect(input.get(0).value).to.equal(''); 
      
    });
  });
});