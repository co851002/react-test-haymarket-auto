import React from 'react';
import Copyright from './index';

describe('<Copyright />', () => {
  /**
   * Prepare Copyright component for testing.
   *
   * @param  {Object} [props={}] properties for component.
   * @param  {String} [method='shallow'] render method to use.
   * @return {Object} rendered JSX object.
   */
  const prepareCopyright = (props = {}, method = 'shallow') => {
    return global[method](<Copyright { ...props } />);
  };

  it('should not render anything without data', () => {
    const wrapper = prepareCopyright();
    expect(wrapper.type()).to.be.null;
  });

  it('should render only text when it is set', () => {
    const wrapper = prepareCopyright({
      text: 'Some fake text'
    }, 'render');
    const div = wrapper.find('div').first().find('div');
    expect(div).to.have.length(1);
    expect(div.text()).to.equal('Some fake text');
    expect(wrapper.find('img')).to.have.length(0);
  });

  it('should render only copytext when it is set', () => {
    const wrapper = prepareCopyright({
      copytext: 'Some fake text'
    }, 'render');
    const div = wrapper.find('div').first().find('div');
    expect(div).to.have.length(1);
    expect(div.text()).to.equal('Some fake text');
    expect(wrapper.find('img')).to.have.length(0);
  });

  it('should render only the image when it is set', () => {
    const wrapper = prepareCopyright({
      image: {
        src: 'fake-image-url.png',
        title: 'Fake title',
        alt: 'Fake alt'
      }
    }, 'render');
    const img = wrapper.find('div').first().find('img');
    const div = wrapper.find('div').first().find('div');
    expect(img).to.have.length(1);
    expect(div).to.have.length(0);
    expect(img.prop('src')).to.equal('fake-image-url.png');
    expect(img.prop('title')).to.equal('Fake title');
    expect(img.prop('alt')).to.equal('Fake alt');
  });

  it('should render HTML only in text, but not in copytext', () => {
    const wrapper = prepareCopyright({
      text: '<p>Some fake text 1</p>',
      copytext: '<p>Some fake text 2</p>'
    }, 'render');
    const p = wrapper.find('div').first().find('p');
    expect(p).to.have.length(1);
    expect(p.text()).to.equal('Some fake text 1');
    expect(wrapper.find('div').last().text()).to.equal('<p>Some fake text 2</p>');
  });

  it('should render elements in right order', () => {
    const wrapper = prepareCopyright({
      text: 'Some fake text 1',
      copytext: 'Some fake text 2',
      image: {
        src: 'fake-image-url.png'
      }
    }, 'render');
    const div = wrapper.find('div').first().children();
    expect(div.length).to.equal(3);
    expect(div.eq(0).is('div')).to.be.true;
    expect(div.eq(0).text()).to.equal('Some fake text 1');
    expect(div.eq(1).is('img')).to.be.true;
    expect(div.eq(2).is('div')).to.be.true;
    expect(div.eq(2).text()).to.equal('Some fake text 2');
  });
});
