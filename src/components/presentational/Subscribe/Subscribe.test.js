import React from 'react';
import Subscribe from './index';

describe('<Subscribe />', () => {
  /**
   * Prepare Subscribe component for testing.
   *
   * @param  {Object} [props={}] properties for component.
   * @param  {String} [method='shallow'] render method to use.
   * @return {Object} rendered JSX object.
   */
  const prepareSubscribe = (props = {}, method = 'shallow') => {
    return global[method](<Subscribe { ...props } />);
  };

  it('should not render anything without data', () => {
    const wrapper = prepareSubscribe();
    expect(wrapper.type()).to.be.null;
  });

  it('should render only text when it is set', () => {
    const wrapper = prepareSubscribe({
      text: 'Some fake text'
    }, 'render');

    const div = wrapper.find('div').first().find('div');
    const link = wrapper.find('div').first().find('a');
    const img = wrapper.find('div').first().find('img');
    expect(div).to.have.length(1);
    expect(link).to.have.length(0);
    expect(img).to.have.length(0);
    expect(div.text()).to.equal('Some fake text');
    expect(wrapper.find('img')).to.have.length(0);
  });

  it('should render only cta as link when href is set', () => {
    const wrapper = prepareSubscribe({
      cta: {
        text: 'Some fake text',
        href: 'Some fake link'
      }
    }, 'render');
    const link = wrapper.find('a');
    const img = wrapper.find('div').first().find('img');
    const div = wrapper.find('div').first().find('div');
    expect(link).to.have.length(1);
    expect(img).to.have.length(0);
    expect(div).to.have.length(0);
    expect(link.text()).to.equal('Some fake text');
    expect(link.prop('href')).to.equal('Some fake link');
  });

  it('should render only cta as div when property not href', () => {
    const wrapper = prepareSubscribe({
      cta: {
        text: 'Some fake text'
      }
    }, 'render');
    const link = wrapper.find('div').first().find('a');
    const img = wrapper.find('div').first().find('img');
    const button = wrapper.find('div').first().find('button');
    
    expect(link).to.have.length(0);
    expect(img).to.have.length(0);
    expect(button).to.have.length(1);
    expect(button.text()).to.equal('Some fake text');
  });

  it('should render only image when it is set', () => {
    const wrapper = prepareSubscribe({
      image: {
        src: 'fake-image-url.png',
        title: 'Fake title',
        alt: 'Fake alt'
      }
    }, 'render');
    const img = wrapper.find('div').first().find('img');
    const div = wrapper.find('div').first().find('div');
    const a = wrapper.find('div').first().find('div');
    expect(img).to.have.length(1);
    expect(div).to.have.length(0);
    expect(a).to.have.length(0);
    expect(img.prop('src')).to.equal('fake-image-url.png');
    expect(img.prop('title')).to.equal('Fake title');
    expect(img.prop('alt')).to.equal('Fake alt');
  });

  it('should render elements in right order', () => {
    const wrapper = prepareSubscribe({
      text: 'Some fake text 1',
      cta: {
        text: 'Some fake text 2',
        href: 'Some fake link'
      },
      image: {
        src: 'fake-image-url.png'
      }
    }, 'render');
    const div = wrapper.find('div').first().children();
    expect(div.length).to.equal(3);
    expect(div.eq(0).is('img')).to.be.true;
    expect(div.eq(1).is('div')).to.be.true;
    expect(div.eq(1).text()).to.equal('Some fake text 1');
    expect(div.eq(2).is('a')).to.be.true;
    expect(div.eq(2).text()).to.equal('Some fake text 2');
  });
});
