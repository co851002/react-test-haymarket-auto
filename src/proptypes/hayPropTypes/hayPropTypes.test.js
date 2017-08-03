import React from 'react';
import hayPropTypes from 'hayPropTypes';
import CompMock from 'utils_tests/test_mocks/CompMock';
import { connect } from 'react-redux';

describe('hayPropTypes', () => {

  // const A = React.createElement('A');
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
  /**
   *Test class
   *@return {void}
   */
  class C extends React.Component {
    /**
     * Rener method
     * @return {object} -
     */
    render() {
      return <h1>I am a fake class Component!! :)</h1>;
    }
  }

  const ConnectedChild = connect()(C);

  const children = [ <CompMock key = '1' />, <C key = '3' />];
  const child = <C key = '1' />;
  const types = ['C', 'CompMock'];
  const WrongTypes = ['WrongType1', 'WrongType2'];
  
  //Props
  const propsWithChildren = {
    children: children
  };
  
  const propsWithChildClass = {
    children: child
  };

  const propsWithConnectedChild = {
    children: <ConnectedChild />
  };

  const propsWithChildFunc = {
    children: <Button />
  };

  const propsWithChildWrappedHTML = {
    children: <i>{ child }</i>
  };

  //Dynamic tests variables definition
  const commonTestCases = [
    {
      name: 'childOfType',
      test: [
        { 
          types: types[0], 
          props: propsWithChildClass, 
          expected: null
        },
        { 
          types: WrongTypes[0], 
          props: propsWithChildClass, 
          errorMsg: `FakeElem\'s prop children has to be of type: ${WrongTypes[0]}` 
        },
        { 
          types: 'Button', 
          props: propsWithChildFunc, 
          expected: null 
        },
        {
          numberOfChildren: 1
        }
      ]
    },
    {
      name: 'childOfTypes',
      test: 
      [
        { 
          types: types[0], 
          props: propsWithChildClass, 
          expected: null
        },
        { 
          types: WrongTypes[0],
          props: propsWithChildClass,
          errorMsg: `FakeElem\'s prop children has to be of type: ${WrongTypes[0]}`
        },
        { 
          types: 'Button', 
          props: propsWithChildFunc, 
          expected: null 
        },        
        {
          numberOfChildren: 1
        }
      ]
    },
    {
      name: 'childrenOfTypes',
      test: [
        { 
          types: types, 
          props: propsWithChildren,
          expected: null
        },
        { 
          types: WrongTypes, 
          props: propsWithChildren,
          errorMsg: `FakeElem\'s prop children has to be of type: ${WrongTypes}`
        },
        { 
          types: 'Button', 
          props: propsWithChildFunc, 
          expected: null 
        },        
        {
          numberOfChildren: null
        }        
      ]
    },
    {
      name: 'onlySpecificNumberOfOfTypes',
      test: [
        { 
          types: types, 
          props: propsWithChildren,
          expected: null
        },        
        { 
          types: WrongTypes,
          props: propsWithChildren,
          errorMsg: `FakeElem\'s prop children has to be of type: ${WrongTypes}`
        },
        { 
          types: 'Button', 
          props: propsWithChildFunc, 
          expected: null 
        },        
        {
          numberOfChildren: 1
        }        
      ]
    },
    {
      name: 'notAllowChildrenOfTypes',
      test: [
        { 
          types: WrongTypes, 
          props: propsWithChildren,
          expected: null
        },
        { 
          types: types,
          props: propsWithChildren,
          errorMsg: `FakeElem\'s prop children cannot be of type: ${types}`
        },
        { 
          types: 'A', 
          props: propsWithChildFunc, 
          expected: null 
        },        
        {
          numberOfChildren: null
        }        
      ]
    }
  ];

  describe('Common test cases for:', () => {
    commonTestCases.forEach( (func) => {
      
      describe(func.name, () => {

        it('should return null (success) when a child of the right type is provided', () => {
          const wrapper = hayPropTypes[func.name](func.test[0].types)(func.test[0].props, 'children', 'FakeElem');
          expect(wrapper).to.equal(func.test[0].expected);
        });

        it('should return null (success) when a connected child of the right type is provided', () => {
          const wrapper = hayPropTypes[func.name](func.test[0].types)(propsWithConnectedChild, 'children', 'FakeElem');
          expect(wrapper).to.equal(null);
        });
        
        it('should return null (success) if the right type of component is provided, but it is wrapped into an HTML tag', () => {
          const wrapper = hayPropTypes[func.name](func.test[0].types)(propsWithChildWrappedHTML, 'children', 'FakeElem');
          expect(wrapper).to.equal(null);
        });

        it('should throw an error when a child or children of the wrong type is/are provided', () => {
          expect(() => {
            hayPropTypes[func.name](func.test[1].types)(func.test[1].props, 'children', 'FakeElem');
          }).to.throw(func.test[1].errorMsg);
        });

        it('should return null (success) when a child created as functional of the right type is provided', () => {
          const wrapper = hayPropTypes[func.name](func.test[2].types)(propsWithChildFunc, 'children', 'FakeElem');
          expect(wrapper).to.equal(null);
        });        

        it('should return null when children are not provided as a prop', () => {
          expect(hayPropTypes[func.name]('A')({}, 'children', 'FakeElem')).to.equal(null);
        });

        it('should throw an error when 0 children are provided', () => {
          expect(() => {
            hayPropTypes[func.name]('A')({ children: <i />}, 'children', 'FakeElem');
          }).to.throw('Should have at least 1 child component');
        });

        if(func.test[3].numberOfChildren != null){
          it(`should throw an error when more than ${func.test[3].numberOfChildren} child/children is/are provided`, () => {

            expect(() => {
              hayPropTypes[func.name]('A', func.test[3].numberOfChildren)(propsWithChildren, 'children', 'FakeElem');
            }).to.throw(`FakeElem\'s prop children: Only ${func.test[3].numberOfChildren} can be passed. You are passing: ${propsWithChildren.children.length}`);

          });
        } 

      });
    
    });
  });

  describe('types - checkArrayOfTypes', () => { 

    const arrToCheckAgainst = ['elem1','elem2'];
    const arrFromArrayOfCorrect = ['elem1','elem2'];
    const arrFromArrayOfWrong = ['elem1','elem3'];

    it('should throw an error if the elements are not the same as the array provided', () => {
      expect(() => {
        for(let i = 0; i < arrFromArrayOfWrong.length; i++){
          hayPropTypes.types(arrToCheckAgainst)(arrFromArrayOfWrong, i, 'ComponentWhatever', 'props', 'children');
        }
      }).to.throw(`Validation failed. Invalid props children. 'elem3' supplied to ComponentWhatever, but it needs to match a value in the array [${arrToCheckAgainst}]`);
    });

    it('should return null if all the elements are the same as the array provided', () => {
      expect( (() => {
        for(let i = 0; i < arrFromArrayOfCorrect.length; i++){
          hayPropTypes.types(arrToCheckAgainst)(arrFromArrayOfCorrect, i, 'ComponentWhatever', 'props', 'children');
        }
        return null;
      })()).to.equal(null);
    });

  });

  describe('isNumberRange', () => { 
    
    const elemToCheckOutOfRange = {
      children: 6
    };
    const elemToCheckInRange = {
      children: 5
    };
    const min = 1;
    const max = 5;

    it('should throw an error if the elements are not in range', () => {
      expect(() => {
        hayPropTypes.numberInRange(min, max)(elemToCheckOutOfRange, 'children','ComponentWhatever');
      }).to.throw(`Validation failed. Invalid prop children. '${elemToCheckOutOfRange.children}' supplied in ComponentWhatever, but it needs to be a number beetwen ${min} and ${max}.`);
    });

    it('should return null if all the elements are in range', () => {
      const wrapper = hayPropTypes.numberInRange(min, max)(elemToCheckInRange, 'children','ComponentWhatever');
      expect(wrapper).to.equal(null);
    });

  });

  describe('checkRelatedProp', () => {
    const propsToPass = {
      prop1: 6,
      prop2: 12
    };

    it('should throw an error if the validation of checkRelatedProp fails', () => {
      expect(() => {
        hayPropTypes.checkRelatedProp((props, propsName, componentName, relatedPropName) => {
          return (props[relatedPropName] + props[propsName]) > 12 ? false : true;
        }, 'prop2', 'The sum of prop1 and prop2 has to be 12')(propsToPass, 'prop1', 'ComponentWhatever');

      }).to.throw(`Validation failed. Invalid prop prop1. '12' supplied in ComponentWhatever. The sum of prop1 and prop2 has to be 12`);
    });

    it('should return null if the validation of checkRelatedProp succeed', () => {
      const wrapper = hayPropTypes.checkRelatedProp((props, propsName, componentName, relatedPropName) => {
        return (props[relatedPropName] + props[propsName]) > 20 ? false : true;
      }, 'prop2')(propsToPass, 'prop1', 'ComponentWhatever');
      expect(wrapper).to.equal(null);
    });

  });

});