import { getResponsiveClasses } from '../gridFunctions';
import styles from 'components/Grid.scss';

/**
* Test for gridFunctions.
* @test {gridFunctions}
*/
describe('GridFunctions', () => {
  it('should return an xs responsive class when propValue is true', () => {
    const actual = getResponsiveClasses('col', 'start', true);
    const expected = styles['col-start-xs'];

    expect(actual).to.equal(expected);
  });  
 
  it('should return add one formatted responsive class style if propValue is a string ', () => {
    const actual = getResponsiveClasses('col', 'start', 'lg');
    const expected = styles['col-start-lg'];
    
    expect(actual).to.equal(expected);
  });  


  it('should return an array of formatted responsive class styles if propValue is an array', () => {
    const propValues = ['sm', 'md','lg'];
    const actual = getResponsiveClasses('col', 'start', propValues);
    const expected = [
      styles['col-start-sm'], 
      styles['col-start-md'],
      styles['col-start-lg']
    ];
    
    expect(actual).to.deep.equal(expected);
  });  

  it('should not return any class if not valid', () => {
    const propValues = 'notAValidStyle';
    const actual = getResponsiveClasses('col', 'start', propValues);
    expect(actual).to.deep.equal(undefined);
  });  
});

