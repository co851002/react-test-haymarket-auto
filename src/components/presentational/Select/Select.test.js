import React from 'react';
import Select from 'presentational/Select';
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';

/**
* Test for <Select /> ComponentType component.
* @test {Select}
*/

const items = [ 
  { value: 100, text: 'item 1' },  
  { value: 101, text: 'item 2' }, 
  { value: 102, text: 'item 3' },
  { value: 103, text: 'item 4' },
  { value: 104, text: 'item 5' }
];

const props = {
  items: items,
  name: 'select-id'
};

describe('<Select />', () => {

  it('should render Select with items', () => {
    const wrapper = shallow(<Select { ...props } />);
    expect(wrapper).to.have.length(1);

    const select = wrapper.find('select');
    expect(select).to.have.length(1);
    expect(select.prop('name')).to.equal('select-id');
    expect(select.prop('className')).to.equal(bootstrap.formControl);

    const options = wrapper.find('option');
    expect(options).to.have.length(5);
    
    for(let i = 0; i < 5; i++) {
      expect(options.at(i).prop('value')).to.equal(items[i].value);
      expect(options.at(i).prop('children')).to.equal(items[i].text);
    }
  });

  it('should render default disabled option', () => {
    const wrapper = shallow(<Select { ...props } defaultDisabled = 'Default string' />);
    expect(wrapper).to.have.length(1);

    const options = wrapper.find('option');
    expect(options).to.have.length(6);

    expect(options.at(0).prop('disabled')).to.be.true;
    expect(options.at(0).prop('children')).to.equal('Default string');
  });

  it('should render with custom className', () => {
    const wrapper = shallow(<Select { ...props } className = 'customClass' />);
    expect(wrapper).to.have.length(1);

    const select = wrapper.find('select');
    expect(select.prop('className')).to.equal('customClass');
  });

  it('should render multi select', () => {
    const wrapper = shallow(<Select { ...props } multiple = { true } />);
    expect(wrapper).to.have.length(1);

    const select = wrapper.find('select');
    expect(select.prop('multiple')).to.be.true;
  });
});