import React from 'react';
import Col, { checkSumOffsetAndColCallback } from 'presentational/Grid/Col';
import styles from 'components/Grid.scss';

/**
* Test for <Col/> presentational component.
* @test {Col}
*/
describe('<Col />', () => {

 /**
  * @test 
  */
  it('should render its children', () => {
    const wrapper = shallow(
      <Col>
        <div className = 'child' >child element</div>
      </Col>
    );
    expect(wrapper.find('.child')).to.have.length(1);
  });

  it('should render classes via className prop', () => {
    const wrapper = shallow(
      <Col className = 'custom-class'>
        <div >child element</div>
      </Col>
    );
    expect(wrapper.find('.custom-class')).to.have.length(1);
  });

  it('should render column width classes when size props are set', () => {
    const wrapper = render(
      <Col colXs = { 1 } colSm = { 2 } colMd = { 3 } colLg = { 4 } >
        <div>child element</div>
      </Col>
    );

    const expectedClasses = [
      styles['col-xs-1'],
      styles['col-sm-2'],
      styles['col-md-3'],
      styles['col-lg-4']
    ];

    expectedClasses.forEach((item) => {
      const hasClass = wrapper.find('div').hasClass(item);
      expect(hasClass).to.equal(true);
    });
  });

  it('should render column offset classes when offset props are set', () => {
    const wrapper = render(
      <Col xsOffset = { 1 } smOffset = { 2 } mdOffset = { 3 } lgOffset = { 4 } >
        <div>child element</div>
      </Col>
    );

    const expectedClasses = [
      styles['col-offset-xs-1'],
      styles['col-offset-sm-2'],
      styles['col-offset-md-3'],
      styles['col-offset-lg-4']
    ];

    expectedClasses.forEach((item) => {
      const hasClass = wrapper.find('div').hasClass(item);
      expect(hasClass).to.equal(true);
    });
  });

  it('should render column alignment classes when alignment props are set', () => {
    const wrapper = render(
      <Col start end center baseline stretch >
        <div>child element</div>
      </Col>
    );

    const expectedClasses = [
      styles['col-start-xs'],
      styles['col-end-xs'],
      styles['col-center-xs'],
      styles['col-baseline-xs'],
      styles['col-stretch-xs']
    ];

    expectedClasses.forEach((item) => {
      const hasClass = wrapper.find('div').hasClass(item);
      expect(hasClass).to.equal(true);
    });
  });

  it('should render a hide class when \'hide\' is set against a width prop', () => {
    const wrapper = render(
      <Col colXs = { 'hide' } >
        <div>child element</div>
      </Col>
    );

    const hasClass = wrapper.find('div').hasClass(styles['col-xs-hide']);
    expect(hasClass).to.equal(true);
  });

  it('should render and xs "autoWidth" class when prop is true', () => {
    const wrapper = render(
      <Col autoWidth>
        <div>child element</div>
      </Col>
    );

    const hasClass = wrapper.find('div').hasClass(styles['col-auto-xs']);
    expect(hasClass).to.equal(true);
  });

  it('should render a viewport "autoWidth" class when prop is a viewport as string', () => {
    const expectedCol = 'md';
    
    const wrapper = render(
      <Col autoWidth = { expectedCol }>
        <div>child element</div>
      </Col>
    );

    const hasClass = wrapper.find('div').hasClass(styles[`col-auto-${expectedCol}`]);
    expect(hasClass).to.equal(true);
  });

  it('should render multiple viewport "autoWidth" classes when prop is an array or viewports', () => {
    const expectedCol = ['md', 'lg'];
    
    const wrapper = render(
      <Col autoWidth = { expectedCol }>
        <div>child element</div>
      </Col>
    );

    const hasClassMd = wrapper.find('div').hasClass(styles[`col-auto-${expectedCol[0]}`]);
    const hasClassLg = wrapper.find('div').hasClass(styles[`col-auto-${expectedCol[1]}`]);
    expect(hasClassMd).to.equal(true);
    expect(hasClassLg).to.equal(true);
  });

  it('should render "first" class with prop value as col size when first prop is set', () => {
    const expectedCol = 'xs';

    const wrapper = render(
      <Col first = { expectedCol }>
        <div>child element</div>
      </Col>
    );

    const hasClass = wrapper.find('div').hasClass(styles[`col-first-${expectedCol}`]);
    expect(hasClass).to.equal(true);
  });

  it('should render "last" class with prop value as col size when last prop is set', () => {
    const expectedCol = 'xs';

    const wrapper = render(
      <Col last = { expectedCol }>
        <div>child element</div>
      </Col>
    );

    const hasClass = wrapper.find('div').hasClass(styles[`col-last-${expectedCol}`]);
    expect(hasClass).to.equal(true);
  });

  describe('getOrderClasses() ', () => {
    it('should return a class array based on order prop keys and values in the correct format', () => {
      const wrapper = mount(
        <Col className = 'col-class' order = { { 'xs' : 5, sm: 4, md: 3, lg: 1 } } />
      );

      const expectedClasses = [
        styles['col-order-xs-5'],
        styles['col-order-sm-4'],
        styles['col-order-md-3'],
        styles['col-order-lg-1']
      ];

      const classes = wrapper.instance().getOrderClasses();
      expect(classes).to.deep.equal(expectedClasses);
    });
  });
});

describe('checkSumOffsetAndColCallback: ', () => {

  it('should return true is the sum is < 13', () => {
    expect(checkSumOffsetAndColCallback(1,2)).to.equal(true);
  });

  it('should return false is the sum is > 12', () => {
    expect(checkSumOffsetAndColCallback(11,2)).to.equal(false);
  });

});