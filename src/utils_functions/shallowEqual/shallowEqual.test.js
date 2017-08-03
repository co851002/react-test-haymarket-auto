import shallowEqual from 'utils_functions/shallowEqual';
/**
* Test the function getNumberOfElementsOfArrayOfArrays
* @test {getNumberOfElementsOfArrayOfArrays}
*/
describe('Util function getNumberOfElementsOfArrayOfArrays', () => {

  it('should return true if 2 objects are the shallow equal', () => {
    const objA = {a: 1, b: 2};
    const objB = {a: 1, b: 2};
    expect(shallowEqual(objA, objB)).to.equal(true);
  });

  it('should return true if shallow compare the same object', () => {
    const objA = {a: 1, b: 2};
    expect(shallowEqual(objA, objA)).to.equal(true);
  });

  it('should return false if 2 objects are the shallow different', () => {
    const objA = {a: 1, b: 2};
    const objB = {a: 1, b: 4};
    expect(shallowEqual(objA, objB)).to.equal(false);
  });

  it('should return false if length of objects is different', () => {
    const objA = {a: 1};
    const objB = {a: 1, b: 4};
    expect(shallowEqual(objA, objB)).to.equal(false);
  });

  it('should return false for objA null', () => {
    const objA = null;
    const objB = {a: 1, b: 4};
    expect(shallowEqual(objA, objB)).to.equal(false);
  });

  it('should return false for objB null', () => {
    const objA = {a: 1, b: 2};
    const objB = null;
    expect(shallowEqual(objA, objB)).to.equal(false);
  });


});