import flatten from 'utils_functions/flatten';
/**
* Test the function flatten
* @test {flatten}
*/
const items = [{
  active: false,
  children: [
    {
      active: false,
      children: [],
      elemId: 2,
      parent: 1,
      path: '/fakepath2',
      text: 'fake2',
      type: 'fakemenu',
      weight: 90
    },
    {
      active: false,
      children: [],
      elemId: 3,
      parent: 1,
      path: '/fakepath3',
      text: 'fake3',
      type: 'fakemenu',
      weight: 91
    }
  ],
  elemId: 1,
  parent: 0,
  path: '/fakepath1',
  text: 'fake1',
  type: 'fakemenu',
  weight: 10
},
{
  active: false,
  children: [],
  elemId: 4,
  parent: 0,
  path: '/fakepath4',
  text: 'fake4',
  type: 'fakemenu2',
  weight: 11,
  icon: {
    code: '4',
    position: 'left'
  },
},
{
  active: false,
  children: [],
  elemId: 5,
  parent: 0,
  path: '/fakepath5',
  text: 'fake5',
  type: 'fakemenu2',
  weight: 12
}    
];

const flatItems = [ { active: false,
  children: [],
  elemId: 2,
  parent: 1,
  path: '/fakepath2',
  text: 'fake2',
  type: 'fakemenu',
  weight: 90 },
{ active: false,
  children: [],
  elemId: 3,
  parent: 1,
  path: '/fakepath3',
  text: 'fake3',
  type: 'fakemenu',
  weight: 91 },
{ active: false,
  children: [],
  elemId: 4,
  parent: 0,
  path: '/fakepath4',
  text: 'fake4',
  type: 'fakemenu2',
  weight: 11,
  icon: { code: '4', position: 'left' } },
{ active: false,
  children: [],
  elemId: 5,
  parent: 0,
  path: '/fakepath5',
  text: 'fake5',
  type: 'fakemenu2',
  weight: 12 } ];

describe('Util function flatten', () => {

  it('should return null if nothing is provided', () => {
    const result = flatten(null);
    expect(result).to.equal(null);
  });

  it('should return the correct flatten object', () => {
    const result = flatten(items);
    expect(result).to.deep.equal(flatItems);
  });

  it('should return an empy array if the passed param is an obj', () => {
    const result = flatten({something: []});
    expect(result).to.deep.equal([]);
  });

});