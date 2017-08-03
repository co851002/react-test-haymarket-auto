import isNumberRange from 'utils_functions/isNumberRange';
/**
 * @test {isNumberRange}
 */
describe('isNumberRange', () => {
  it('should return false if not a number', () => {
    const result = isNumberRange('string');
    expect(result).to.equal(false);
  });

  /**
   * @test {isNumberRange}
   */
  it('should return false if value is not within min and max range', () => {
    const result = isNumberRange(3, 1, 2);
    expect(result).to.equal(false);

  });

  /**
   * @test {isNumberRange}
   */
  it('should return true if a number and within min and max range', () => {
    const result = isNumberRange(2, 1, 2);
    expect(result).to.equal(true);
  });
});