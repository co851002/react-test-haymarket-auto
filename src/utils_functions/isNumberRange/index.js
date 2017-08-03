/**
 * Utility function that checks a value is a number and that it is within a min amd max range.
 * @param {number} value - the number to check the range against.
 * @param {number} min - the min range value
 * @param {number} max - the max range value.
 * @return {bool} - true is value is a number and between min and max range. False if not a number.
 */
export default function isNumberRange(value, min, max) {
  if (isNaN(value)) {
    return false;
  }

  return (typeof value === 'number' && value >= min && value <= max) ? true : false;
}