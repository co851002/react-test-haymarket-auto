import React from 'react';
import Logo from './index';

describe('<Logo />', () => {
  it('should render logo without href', () => {
    const props = {
      className: 'test-class',
    };
    const wrapper = shallow(
      <Logo { ...props } />
    );
    expect(wrapper.is('RetinaImage')).to.be.true;
    expect(wrapper.prop('className')).to.equal('test-class');
  });

  it('should render logo with href as link', () => {
    const props = {
      className: 'test-class',
      href: '/test'
    };
    const wrapper = shallow(
      <Logo { ...props } />
    );
    expect(wrapper.is('Link')).to.be.true;
    expect(wrapper.prop('to')).to.equal('/test');
    expect(wrapper.find('RetinaImage')).to.have.length(1);
    expect(wrapper.prop('className')).to.equal('test-class');
  });

  it('should render logo with title', () => {
    const props = {
      title: 'Test title',
    };

    const wrapper = shallow(
      <Logo { ...props } />
    );
    expect(wrapper.prop('title')).to.equal('Test title');
  });

  it('should render logo with alt', () => {
    const props = {
      alt: 'Test alt',
    };

    const wrapper = shallow(
      <Logo { ...props } />
    );
    expect(wrapper.prop('alt')).to.equal('Test alt');
  });
});
