import React from 'react';
import Pager from './index';

import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';

describe('<Pager />', () => {
  const props = {
    total: 20, 
    limit: 10,
    gotoPage: sinon.spy()
  };

  describe('Render', () => {
    it('should NOT render when total is 0', () => {
      const wrapper = shallow(
        <Pager total = { 0 } />
      );

      expect(wrapper.node).to.equal(null);
    });

    it('should render an amout of pager items (limit) plus prev and next as <li>', () => {
      const wrapper = shallow(
        <Pager { ...props } />
      );
      
      const expected = props.limit + 2; 
      expect(wrapper.find('li')).to.have.length(expected);
    });

    it('should render 2 icons for prev and next when the useIcons prop is set', () => {
      const wrapper = shallow(
        <Pager { ...props } useIcons />
      );
      
      expect(wrapper.find('Icon')).to.have.length(2);
    });

    it('should render 4 icons for prev, next, first, last when the useIcons and showFirstLast props are set', () => {
      const wrapper = shallow(
        <Pager { ...props } useIcons showFirstLast />
      );
      
      expect(wrapper.find('Icon')).to.have.length(4);
    });

    it('should render 4 custom icons for prev, next, first, last when icon props are all set', () => {
      const iconProps = {
        previconName: 'angle-right',
        nexticonName: 'angle-right',
        firsticonName: 'angle-right',
        lasticonName: 'angle-right'
      };
     
      const wrapper = shallow(
        <Pager { ...props } { ...iconProps } useIcons showFirstLast />
      );
      
      const icons = wrapper.find('Icon').nodes;

      icons.forEach((item) => {
        expect(item.props.iconName).to.equal('angle-right');
      });

    });

    it('should add a size class when the size prop is set', () => {
      const sizeValue = 'sm';
      const sizeClass = `pagination-${sizeValue}`;

      const wrapper = shallow(
        <Pager { ...props } size = { sizeValue } />
      );

      expect(wrapper.find('ul').hasClass(bootstrap[sizeClass])).to.equal(true);
    });

    it('should add a disabled class for prev btn when current prop is 1', () => {
      const wrapper = shallow(
        <Pager { ...props } current = { 1 } />
      );

      expect(wrapper.find('li').first().hasClass(bootstrap.disabled)).to.equal(true);
    });

    it('should add a disabled class for next btn when current is equal to the total', () => {
      const wrapper = shallow(
        <Pager showFirstLast current = { 10 } total = { 10 } />
      );

      expect(wrapper.find('li').last().hasClass(bootstrap.disabled)).to.equal(true);
    });
  });

  describe('getPagerItems() function', () => {
    it('should return a list of items based on the limit prop - current item should also be active.', () => {
      const currentItem = 7;
      const wrapper = mount(
        <Pager { ...props } current = { currentItem } />
      );

      const result = wrapper.instance().getPagerItems();
      expect(result.length).to.equal(10);
      // Check active item.
      result.forEach((item) => {
        if (item.key === `pagerItem-${currentItem}`) {
          expect(item.props.className).to.equal(bootstrap.active);
        }
      });
    });

    it('should call the gotoPage prop when a pager item it clicked.', () => {
      const wrapper = mount(
        <Pager { ...props } current = { 5 } />
      );

      const result = wrapper.instance().getPagerItems();

      // Call click function.
      result[0].props.children.props.onClick();
      expect(props.gotoPage.called).to.equal(true);
    });
  });

  describe('getPagerStart() function', () => {
    it('should return 1 until the current prop item is halfway passed the center point of limit prop.', () => {
      const wrapper = mount(
        <Pager { ...props } current = { 3 } />
      );
      
      const expected = 1;
      const result = wrapper.instance().getPagerStart();
      
      expect(result).to.equal(expected);
    });


    it('should return the start based on whether the current prop - limit/2 is greated than 1', () => {
      const wrapper = mount(
        <Pager { ...props } current = { 10 } />
      ); 

      const expected = 5;
      const result = wrapper.instance().getPagerStart();

      expect(result).to.equal(expected);
    });


    it('should return the total - limit + 1 if the total item is visible', () => {
      const wrapper = mount(
        <Pager { ...props } current = { 17 } />
      ); 

      const expected = 11;
      const result = wrapper.instance().getPagerStart();

      expect(result).to.equal(expected);
    });
  });

  describe('handleGoToLastPage function', () => {
    it('should call the gotoPage prop with the total prop number', () => {
      const wrapper = mount(
        <Pager { ...props } current = { 3 } />
      );
      
      wrapper.instance().handleGoToLastPage();
      
      expect(props.gotoPage.calledWith(20)).to.equal(true);
    });
  });

  describe('handleGoToFirstPage function', () => {
    it('should call the gotoPage prop with 1', () => {
      const wrapper = mount(
        <Pager { ...props } current = { 3 } />
      );
      
      wrapper.instance().handleGoToFirstPage();
      
      expect(props.gotoPage.calledWith(1)).to.equal(true);
    });
  });


  describe('handleGoToNextPage function', () => {
    it('should call the gotoPage prop with current + 1', () => {
      const wrapper = mount(
        <Pager { ...props } current = { 3 } />
      );
      
      wrapper.instance().handleGoToNextPage();
      
      expect(props.gotoPage.calledWith(4)).to.equal(true);
    });
  });

  describe('handleGoToPrevPage function', () => {
    it('should call the gotoPage prop with current - 1', () => {
      const wrapper = mount(
        <Pager { ...props } current = { 3 } />
      );
      
      wrapper.instance().handleGoToPrevPage();
      
      expect(props.gotoPage.calledWith(2)).to.equal(true);
    });
  });
});