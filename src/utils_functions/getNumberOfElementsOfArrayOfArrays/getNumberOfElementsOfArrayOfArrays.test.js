import getNumberOfElementsOfArrayOfArrays from 'utils_functions/getNumberOfElementsOfArrayOfArrays';
/**
* Test the function getNumberOfElementsOfArrayOfArrays
* @test {getNumberOfElementsOfArrayOfArrays}
*/
describe('Util function getNumberOfElementsOfArrayOfArrays', () => {

  it('should return 4', () => {
    const array = [ [1,2],[3,4] ];
    const wrapper = getNumberOfElementsOfArrayOfArrays(array);
    expect(wrapper).to.equal(4);
  });

  it('should return null', () => {
    const array = null;
    const wrapper = getNumberOfElementsOfArrayOfArrays(array);
    expect(wrapper).to.equal(null);
  });

  it('should return 0', () => {
    const array = [];
    const wrapper = getNumberOfElementsOfArrayOfArrays(array);
    expect(wrapper).to.equal(0);
  });

});