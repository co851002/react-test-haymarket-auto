import React from 'react';
import Rating from 'presentational/Rating';
import Icon from 'presentational/Icon';
import styles from 'components/Rating.scss';

/**
* Test for <Rating /> presentational component.
* @test {Rating}
*/
describe('<Rating />', () => {

  it('should not render Rating when ratedValue is null', () => {
    const wrapper = shallow(<Rating ratedValue = { null } />);
    expect(wrapper.node).to.equal(null);
  });

  it('should render 5 Icons with no active classes when ratedValue is 0', () => {
    const wrapper = shallow(<Rating ratedValue = { 0 } />);
    expect(wrapper.find(Icon)).to.have.length(5);
    expect(wrapper.find(styles.active)).to.have.length(0);
  });


  it('should render an active classes for wach ratedValue prop', () => {
    const ratedValueProp = 5;
    const wrapper = mount(<Rating ratedValue = { ratedValueProp } />);
    for (let i = 0; i < ratedValueProp; i++) {
      expect(wrapper.find(Icon).at(i).hasClass(styles.active)).to.equal(true);
    }
  });

  it('should render a custom icon using an ascii code when set on the iconName prop', () => {
    const props = {
      value: 5,
      iconName: 'iconName'
    };

    const wrapper = render(<Rating ratedValue = { props.value } iconName = { props.iconName } />);

    for (let i = 0; i < props.value; i++) {
      expect(wrapper.find('use')[i].attribs['xlink:href'].includes(`#wci-${props.iconName}`)).to.equal(true);
    }
  });
});