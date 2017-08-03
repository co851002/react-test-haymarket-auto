import React from 'react';
import Button from 'presentational/Button';
import ButtonGroup from './index';

//Style
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';

describe('<ButtonGroup />', () => {
  const props = {
    buttonText: 'hello'
  };

  it('should NOT render when there are no children', () => {
    const wrapper = shallow(
      <ButtonGroup />
    );

    expect(wrapper.node).to.equal(null);
  });

  it('should render all its children', () => {
    const wrapper = shallow(
      <ButtonGroup>
        <Button buttonText = { props.buttonText } />
        <Button buttonText = { props.buttonText } />
        <Button buttonText = { props.buttonText } />
      </ButtonGroup>
    );

    expect(wrapper.find('Button')).to.have.length(3);
  });

  it('should render a vertical class when vertical prop is set', () => {
    const wrapper = shallow(
      <ButtonGroup vertical>
        <Button buttonText = { props.buttonText } />
        <Button buttonText = { props.buttonText } />
      </ButtonGroup>
    );

    expect(wrapper.find('div').hasClass(bootstrap.btnGroupVertical)).to.equal(true);
  });

  it('will add a custom class when set on className prop', () => {
    const customClass = 'myclass';
    const wrapper = shallow(
      <ButtonGroup className = { customClass }>
        <Button buttonText = { props.buttonText } />
        <Button buttonText = { props.buttonText } />
      </ButtonGroup>
    );

    expect(wrapper.find('div').hasClass(customClass)).to.equal(true);
  });

  it('will add a size class when size prop is set', () => {
    const wrapper = shallow(
      <ButtonGroup size = 'sm'>
        <Button buttonText = { props.buttonText } />
        <Button buttonText = { props.buttonText } />
      </ButtonGroup>
    );
    
    expect(wrapper.find('div').hasClass(bootstrap['btn-group-sm'])).to.equal(true);
  });
});
