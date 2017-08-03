/**
 * @flow
 * It returns the number of elements of an array of arrays
 * @param {array} arrays - array of arrays
 * @return {number} - the total number of elements
 */
export default function getNumberOfElementsOfArrayOfArrays(arrays: Array<Array<mixed>>) : null | number {
  let count = 0;

  if(!arrays || !Array.isArray(arrays)){
    return null;
  }
  else if(arrays.length){
    for(let currentArr of arrays){
      if(currentArr && currentArr.length){
        count += currentArr.length;
      }
    }
  }

  return count;
}