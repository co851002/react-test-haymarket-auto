import React from 'react';
import { Row, Col } from 'presentational/Grid';
import styles from 'components/Grid.scss';

/**
* Test for <Row /> presentational component.
* @test {Row}
*/
describe('<Row />', () => {
 /**
  * @test 
  */
  it('should render its children', () => {
    const wrapper = shallow(
      <Row>
        <Col />
      </Row>
    );
    expect(wrapper.find('Col')).to.have.length(1);
  });

  it('should not render when there are no children', () => {
    const wrapper = shallow(<Row />);
    expect(wrapper.node).to.equal(null);
  });

  it('should render a custom class when className prop is set', () => {
    const wrapper = render(
      <Row className = 'custom-class'>
        <Col />
      </Row>
    );

    const hasClass = wrapper.find('div').hasClass('custom-class');
    expect(hasClass).to.equal(true);
  });


  it('should apply the row class', () => {
    const wrapper = render(
      <Row>
        <Col />
      </Row>
    );

    const hasClass = wrapper.find('div').hasClass(styles.row);
    expect(hasClass).to.equal(true);
  });


  it('should render "reverse-class" when reverse prop is set', () => {
    const wrapper = render(
      <Row reverse>
        <Col />
      </Row>
    );

    const hasClass = wrapper.find('div').hasClass(styles.rowReverseXs);
    expect(hasClass).to.equal(true);
  });

  it('should render a custom class when className prop is set', () => {
    const wrapper = render(
      <Row className = 'custom-class'>
        <Col />
      </Row>
    );

    const hasClass = wrapper.find('div').hasClass('custom-class');
    expect(hasClass).to.equal(true);
  });

  describe('getAlignmentKeys() function', () => {
    it('should return an array of all alignment keys', () => {
      const wrapper = mount(
        <Row>
          <Col />
        </Row>
      );

      const expectedTypes = [
        'top',
        'middle',
        'bottom',
        'around',
        'between',
        'start',
        'center',
        'end',
        'reverse'
      ];

      const actualTypes = wrapper.instance().getAlignmentKeys();
      expect(actualTypes).to.deep.equal(expectedTypes);
    });
  });
});