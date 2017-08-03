import React from 'react';
import Icon from 'presentational/Icon';

/**
* Test for <Icon /> presentational component.
* @test {Icon}
*/
const props = {
  iconName: 's',
  onClick: sinon.spy()
};
describe('<Icon />', () => {

  it('should render Icon', () => {
    const wrapper = shallow(<Icon />);
    expect(wrapper).to.have.length(1);
  });

  it('should have an xlink:href with a prefixed icon name', () => {
    const wrapper = shallow(<Icon iconName = { props.iconName } />);
    expect(wrapper.find('use').node.props.xlinkHref.includes(`#wci-${props.iconName}`)).to.equal(true);
  });

  it('should be able to pass a callback which activates onClick', () => {
    const wrapper = mount(<Icon
      iconName = { props.iconName }
      onClick = { props.onClick } />
    );
    
    const icon = wrapper.find('svg');
    icon.simulate('click');
    
    expect(props.onClick.called).to.equal(true);
  });  

  it('should add a viewBox when viewBox prop is added ', () => {
    const viewBox = '5 5 100 100';
    const wrapper = shallow(<Icon viewBox = { viewBox } iconName = { props.iconName } />);

    expect(wrapper.find('svg').node.props.viewBox).to.equal(viewBox);
  });
});
