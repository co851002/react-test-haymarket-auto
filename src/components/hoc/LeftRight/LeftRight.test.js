import React from 'react';
import leftRight from 'hoc/LeftRight';
import Icon from 'presentational/Icon';

const PositionedIcon = leftRight(Icon);

/**
* Test for <LeftRight /> hoc component.
* @test {LeftRight}
*/
describe('<LeftRight />', () => {

  it('should render LeftRight', () => {
    const PositionedIcon = leftRight(Icon);
    const wrapper = shallow(<PositionedIcon />);
    expect(wrapper).to.have.length(1);
  });

  it('should position the icon on the left', () => {
    const wrapper = mount(<PositionedIcon position = { 'l' } element = { <p>test</p> } hocDataElemId = { 1 } iconName = { 'o' } />);

    expect(wrapper.find('[data-elemId=1]').children().at(0).type()).to.equal(Icon);
    expect(wrapper.find('[data-elemId=1]').children().at(1).type()).to.equal('p');

  });

  it('should position the icon on the right', () => {
    const wrapper = mount(<PositionedIcon position = { 'r' } element = { <p>test</p> } hocDataElemId = { 1 } iconName = { 'o' } />);
    
    expect(wrapper.find('[data-elemId=1]').children().at(0).type()).to.equal('p');
    expect(wrapper.find('[data-elemId=1]').children().at(1).type()).to.equal(Icon);
  });

  it('should render only the icon without the element with position is not provided', () => {
    const wrapper = mount(<PositionedIcon element = { <p>test</p> } hocDataElemId = { 1 } iconName = { 'o' } />);
    expect(wrapper.find('[data-elemId=1]').children()).to.have.length(0);
    expect(wrapper.find(Icon)).to.have.length(1);
    expect(wrapper.find('p')).to.have.length(0);
  });

});