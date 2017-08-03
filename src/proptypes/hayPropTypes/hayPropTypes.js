import { isDOMTypeElement } from 'utils_functions/checkReactElementsTypes';
import isNumberRange from 'utils_functions/isNumberRange';
/**
 * It generates an js error
 * @param {string} stringError - error to pass to the Error instance
 * @return {object} a new Error
 */
export const getError = (stringError) => {
  throw new Error(stringError);
};

export const viewports = ['xs', 'sm', 'md', 'lg'];

const hayPropTypes = ( () => {

  /**
   * It checks the types.
   * @param {object} elem - React component
   * @param {string} typesToCheck - component's type
   * @return {boolean} -
   */
  const isCorrectComponentTypes = (elem, typesToCheck) => {

    if(elem == null){
      return getError('Should have at least 1 child component');
    }

    const ArrTypesToCheck = Array.isArray(typesToCheck) ? typesToCheck : [typesToCheck];

    //At least one type has to be true
    return ArrTypesToCheck.some( (currType) => {
    
      //"elem.type.type"" is for React components create with React.createElement.
      //We need to consider also if the component is connected, therefore, in that case, we have to check the WrappedComponent.name
      return elem.type && 
             (elem.type.type === currType ||
             elem.type === currType ||
             (elem.type.name === 'Connect' && elem.type.WrappedComponent && elem.type.WrappedComponent.name === currType) || 
             (elem.type.name !== 'Connect' && elem.type.name === currType));

    }) ? true : false;
   
  };

  /**
   * It performs common checks on the prop
   * @param {object} props - from PropTypes
   * @param {string} propName - prop's name
   * @param {string} componentName - component's name
   * @param {number} numberOfChildren - enforce the check on the number of children supplied
   * @return {null} - null for successful validation or throws an error
   */
  const commonCheck = (props, propName, componentName, numberOfChildren) => {
    
    let childrenProps = props[propName];

    if(childrenProps){

      if(isDOMTypeElement(childrenProps)){
        childrenProps = childrenProps.props.children;
      }

      const children = Array.isArray(childrenProps) ? childrenProps : [childrenProps];

      if(numberOfChildren && children.length > numberOfChildren){
        getError(`${componentName}\'s prop children: Only ${numberOfChildren} can be passed. You are passing: ${children.length}`);
      }

      return children;
    
    }

    return null;

  };

  /**
   * It checks the truthiness of the children prop
   * @param {object} props - from PropTypes
   * @param {string} propName - prop's name
   * @param {string} componentName - component's name
   * @param {string} types - types to check
   * @param {number} numberOfChildren - enforce the check on the number of children supplied
   * @return {null} - null for successful validation or throws an error
   */
  const checkTruthiness = (props, propName, componentName, types, numberOfChildren = null) => {

    const children = commonCheck(props, propName, componentName, numberOfChildren);

    if(children === null){
      return null;
    }

    return children.every( (child) =>{

      if(!isCorrectComponentTypes(child, types)){
        return false;
      }

      return true;

    }) ? null : getError(`${componentName}\'s prop ${propName} has to be of type: ${types}`);
    
  };
  /**
   * It checks the falsiness of the children prop
   * @param {object} props - from PropTypes
   * @param {string} propName - prop's name
   * @param {string} componentName - component's name
   * @param {string} types - types to check
   * @param {number} numberOfChildren - enforce the check on the number of children supplied
   * @return {null} - null for successful validation or throws an error
   */
  const checkFalsiness = (props, propName, componentName, types, numberOfChildren = null) => {

    const children = commonCheck(props, propName, componentName, numberOfChildren);

    if(children === null){
      return null;
    }

    return children.every( (child) =>{

      if(isCorrectComponentTypes(child, types)){
        return false;
      }

      return true;

    }) ? null : getError(`${componentName}\'s prop ${propName} cannot be of type: ${types}`);
    
  };

/**
 * It checks that elem is in ArrTypesToCheck.
 * @param {Array} ArrTypesToCheck - Array passed to check against
 * @param {*} elem - current element to check against ArrTypesToCheck
 * @return {boolean} -
 */
  const validateArray = (ArrTypesToCheck, elem) => {
    return ArrTypesToCheck.some( (currType) => {
      return elem === currType;
    });
  };

/**
 * This is the private function called when types is passed to the React propTypes arrayOf (i.e. PropTypes.arrayOf(hayPropTypes.types(viewports))). arrayOf goes throw every element of the array and you need to provide a function which does the comparison that you need.
 * @param {*} propValue - from arrayOf
 * @param {*} key - from arrayOf
 * @param {*} componentName - from arrayOf
 * @param {*} location - from arrayOf
 * @param {*} propFullName - from arrayOf
 * @param {*} ArrTypesToCheck - Array to check against.
 * @return {error} - It returns error only if the validation fails.
 */
  const checkArrayOfTypes = (propValue, key, componentName, location, propFullName, ArrTypesToCheck) => {
    if(!validateArray(ArrTypesToCheck, propValue[key])){
      getError(`Validation failed. Invalid ${location} ${propFullName}. '${propValue[key]}' supplied to ${componentName}, but it needs to match a value in the array [${ArrTypesToCheck}]`);
    }
  };

  return{
    //Only 1 Child is allowed and it can be ONLY of a specific type
    childOfType: (type) => {
      return (props, propName, componentName) => {
        return checkTruthiness(props, propName, componentName, type, 1);
      };
    },

    //Only 1 Child is allowed and it can be ONLY of some specific types
    childOfTypes: (types) => {
      return (props, propName, componentName) => {
        return checkTruthiness(props, propName, componentName, types, 1);
      };
    },

    //Children MUST be of only specific types
    childrenOfTypes: (types) => {
      return (props, propName, componentName) => {
        return checkTruthiness(props, propName, componentName, types);
      };
    },

    //Only a specific number of elements (null is any) are allowed and only of specific types
    onlySpecificNumberOfOfTypes: (types, numberOfChildren = null) => {
      return (props, propName, componentName) => {
        return checkTruthiness(props, propName, componentName, types, numberOfChildren);
      };
    },

    notAllowChildrenOfTypes: (types) => {
      return (props, propName, componentName) => {
        return checkFalsiness(props, propName, componentName, types);
      };
    },

    //NOTE: Not to be used as stand-alone, but only in conjunction with PropTypes.arrayOf -> PropTypes.arrayOf(types(['whatever1','whatever2'])) 
    types: (ArrTypesToCheckAgainst) => {
      return (propValue, key, componentName, location, propFullName) => {
        return checkArrayOfTypes(propValue, key, componentName, location, propFullName, ArrTypesToCheckAgainst);
      };
    },

    numberInRange: (min, max) => {
      return (props, propName, componentName) => {
        return isNumberRange(props[propName], min, max) ? null : getError(`Validation failed. Invalid prop ${propName}. '${props[propName]}' supplied in ${componentName}, but it needs to be a number beetwen ${min} and ${max}.`);
      };
    },

    //It allows to pass a callback in order to check a related prop. This is useful when you need to validate two 
    //props that are related i.e. in the grid system offset + col has to be < 13 and offset and col are two props.
    checkRelatedProp: (callback, relatedPropName, errorMsg = '') => {
      return (props, propName, componentName ) => {
        return callback(props, propName, componentName, relatedPropName) === true || null ? null : getError(`Validation failed. Invalid prop ${propName}. '${props[relatedPropName]}' supplied in ${componentName}. ${errorMsg}`);
      };
    }

  };

})();

export default hayPropTypes;