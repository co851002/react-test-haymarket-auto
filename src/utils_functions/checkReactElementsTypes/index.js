import React from 'react';

/**
 * Return true/false if a component is make as a class component
 * @param {object} component - 
 * @return {boolean} -
 */
export const isClassComponent = (component) => {
  return ( 
    ( typeof component === 'function' || (component.type && component.type === 'function') ) &&                        
    (component.prototype && component.prototype.isReactComponent && component.prototype.render != null)
  );
};

/**
 * Return true/false if a component is make as a functional component
 * @param {object} component - 
 * @return {boolean} -
 */
export const isFunctionComponent = (component) =>{
  return (
    ( typeof component === 'function' || (component.type && typeof component.type === 'function') ) &&
      component.prototype == null);
};

/**
 * Return true/false if is a React component
 * @param {object} component - 
 * @return {boolean} -
 */
export const isReactComponent = (component) => {
  return (isClassComponent(component) || isFunctionComponent(component));
};

/**
 * Return true/false if is a valid React element
 * @param {object} element - 
 * @return {boolean} -
 */
export const isElement = (element) => {
  return React.isValidElement(element);
};

/**
 * Return true/false if is a valid DOMType React element - not a component
 * @param {object} element - 
 * @return {boolean} -
 */
export const isDOMTypeElement = (element) => {
  return isElement(element) && typeof element.type === 'string';
};