import React from 'react';
import Grid from 'presentational/Grid/Grid';
import styles from 'components/Grid.scss';

/**
* Test for <Grid /> presentational component.
* @test {Grid}
*/
describe('<Grid />', () => {

 /**
  * @test 
  */
  it('should render its children', () => {
    const wrapper = shallow(
      <Grid>
        <div className = 'child' >child element</div>
      </Grid>
    );
    expect(wrapper.find('.child')).to.have.length(1);
  });

  it('should render null when no children', () => {
    const wrapper = shallow(<Grid />);
    expect(wrapper.node).to.equal(null);
  });

  it('should render "container" class by default', () => {
    const wrapper = render(
      <Grid>
        <div>child element</div>
      </Grid>
    );

    const hasClass = wrapper.find('div').hasClass(styles['container']);
    expect(hasClass).to.equal(true);
  });

  it('should render "container-fluid" class when isFluid prop is set', () => {
    const wrapper = render(
      <Grid isFluid>
        <div>child element</div>
      </Grid>
    );

    const hasClass = wrapper.find('div').hasClass(styles['container-fluid']);
    expect(hasClass).to.equal(true);
  });

  it('should render classes via className prop', () => {
    const wrapper = shallow(
      <Grid className = 'custom-class'>
        <div >child element</div>
      </Grid>
    );
    expect(wrapper.find('.custom-class')).to.have.length(1);
  });
});