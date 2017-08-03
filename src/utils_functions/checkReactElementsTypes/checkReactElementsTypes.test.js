import React from 'react';
//isClassComponent, isFunctionComponent, isReactComponent, isElement,
import { isDOMTypeElement, isReactComponent, isClassComponent, isFunctionComponent } from 'utils_functions/checkReactElementsTypes';
//
import CompMock from 'utils_tests/test_mocks/CompMock';
/**
* Test the function checkReactElementsTypes
* @test {checkReactElementsTypes}
*/

const p = <p />;
const svg = <svg />;
const div = <div />;
const anchor = <a href = 'http://whatever' />;

const notHtmlElements = ['fake',1,{},[]] ;
const htmlElements = [p,svg,div,anchor];

/**
 * Mock of a functional component
 * @param {object} children -
 * @param {string} color -
 * @return {object} -
 */
const Button = ({ children, color }) => ({
  type: 'button',
  props: {
    className: 'button button-' + color,
    children: {
      type: 'b',
      props: {
        children: children
      }
    }
  }
});

describe('Util function checkReactElementsTypes', () => {

  describe('isDOMTypeElement', () => {
    htmlElements.forEach( (elem) => {
      it(`should return true for <${elem}/>`, () => {  
        expect(isDOMTypeElement(elem)).to.equal(true);

      });
    });

    notHtmlElements.forEach( (elem) => {
      it(`should return false for <${elem}/>`, () => {  
        expect(!isDOMTypeElement(elem)).to.equal(true);
      });
    });
  });

  describe('isReactComponent', () => {

    it('should return true for a React class component', () => {
      expect(isReactComponent(CompMock)).to.equal(true);
    });

    it('should return true for a React functional component', () => {
      expect(isReactComponent(<Button />)).to.equal(true);
    });

    it('should return false for a not React component', () => {
      expect(isReactComponent(p)).to.equal(false);
    });    
  });

  describe('isClassComponent', () => {

    it('should return true for class component', () => {
      expect(isClassComponent(CompMock)).to.equal(true);
    });   

    it('should return false for functional component', () => {
      expect(isClassComponent(<Button />)).to.equal(false);
    });   

  });

  describe('isFunctionComponent', () => {

    it('should return true for functional component', () => {
      expect(isFunctionComponent(<Button />)).to.equal(true);
    });    

    it('should return false for class component', () => {
      expect(isFunctionComponent(CompMock)).to.equal(false);
    });   

  });

});    
