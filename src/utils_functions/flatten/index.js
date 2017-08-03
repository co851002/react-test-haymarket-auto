  /**
   * @flow
   * It flattens a nested object and it removes the childrens' father
   * @param {object} obj - object to flatten
   * @return {object} the flatten object
   */
  export default function flatten(obj: Array<{children: Array<*>}>) : Array<Object> | null {
    if(obj == null){
      return null;
    }

    const array = Array.isArray(obj) ? obj : [obj];

    return array.reduce( (acc, value) => {
      //The element with children doesn't have to be part of the menu
      if(value.children && !value.children.length){
        acc.push(value);
      }
      //Let's move the children up
      if (value.children) {
        const flattened = flatten(value.children);
        /* istanbul ignore else */
        if (flattened) {
          acc = acc.concat(flattened);
        }
      }      
      return acc;
    }, []);
  }