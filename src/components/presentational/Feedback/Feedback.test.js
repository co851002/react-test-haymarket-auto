import React from 'react';
import ReactDOM from 'react-dom';
import Feedback from './index';

describe('<Feedback />', () => {
  /**
   * Prepare Feedback component for testing.
   *
   * @param  {Object} [props={}] properties for component.
   * @param  {String} [method='shallow'] render method to use.
   * @return {Object} rendered JSX object.
   */
  const prepareFeedback = (props = {}, method = 'shallow') => {
    return global[method](<Feedback { ...props } />);
  };

  it('should not render anything without data', () => {
    const wrapper = prepareFeedback();
    expect(wrapper.type()).to.be.null;
  });

  it('should render only text when it is set', () => {
    const wrapper = prepareFeedback({
      labelText: 'Some fake label text'
    }, 'render');
    const div = wrapper.find('div').first().find('div');
    expect(div).to.have.length(1);
    expect(div.text()).to.equal('Some fake label text');
  });

  it('should render only text when it is set', () => {
    const wrapper = prepareFeedback({
      text: '<p>Some fake paragraph text</p>'
    }, 'render');
    const div = wrapper.find('div').first().find('div');
    expect(div).to.have.length(1);
    const p = wrapper.find('div').first().find('p');
    expect(p).to.have.length(1);
    expect(p.text()).to.equal('Some fake paragraph text');
  });

  it('should inject feedbackify script when code is set', () => {
    const documentStub = sinon.stub(document, 'getElementById').returns(false);
    const appendStub = sinon.stub();
    const elementsStub = sinon.stub(document, 'getElementsByTagName').returns([{
      appendChild: appendStub
    }]);

    prepareFeedback({
      feedbackifyCode: '999'
    }, 'mount');

    documentStub.restore();
    elementsStub.restore();

    expect(appendStub.calledOnce).to.equal(true);
  });

  it('should call handleFeedbackClick and trigger Feedback modal when feedbackify link is clicked', () => {
    //const pushStub = sinon.stub();
    const preventStub = sinon.stub();
    global.fby = typeof global.fby !== 'undefined' ? global.fby : { push : () => {}};
    const pushStub = sinon.stub(global.fby, 'push');
    const wrapper = prepareFeedback({
      text: 'With a link <a href=\"#\">sending your feedback</a>',
      labelText: 'Some fake label text',
      feedbackifyCode: '999'
    }, 'shallow');

    wrapper.simulate('click', {
      target: {
        tagName: {
          toLowerCase: () => { return 'a'; }
        }
      },

      preventDefault: preventStub
    });

    pushStub.restore();

    expect(preventStub.calledOnce).to.equal(true);
    expect(pushStub.calledOnce).to.equal(true);
    expect(pushStub.calledWith(['showForm', '999'])).to.equal(true);
  });

  it('should call handleFeedbackClick but not trigger Feedback modal when feedbackify non-link element is clicked', () => {
    const preventStub = sinon.stub();
    global.fby = typeof global.fby !== 'undefined' ? global.fby : { push : () => {}};
    const pushStub = sinon.stub(global.fby, 'push');
    const wrapper = prepareFeedback({
      labelText: 'Some fake label text',
      feedbackifyCode: '999'
    }, 'shallow');

    wrapper.simulate('click', {
      target: {
        tagName: {
          toLowerCase: () => { return 'p'; }
        }
      },
      preventDefault: preventStub
    });

    pushStub.restore();

    expect(preventStub.called).to.equal(false);
    expect(pushStub.called).to.equal(false);
  });

  it('should inject script when props updated', () => {
    const node = document.createElement('div');
    const wrapper = ReactDOM.render(<Feedback
      labelText = 'Some fake label text'
      feedbackifyCode = '999' />,
      node);

    const injectStub = sinon.stub(wrapper, 'injectScript').returns({});

    ReactDOM.render(<Feedback
      labelText = 'Some fake label text'
      feedbackifyCode = '1000' />,
      node);

    injectStub.restore();

    expect(injectStub.calledOnce).to.equal(true);
  });

  it('should not inject script when props updated with same value', () => {
    const node = document.createElement('div');
    const wrapper = ReactDOM.render(<Feedback
      labelText = 'Some fake label text'
      feedbackifyCode = '999' />,
      node);

    const injectStub = sinon.stub(wrapper, 'injectScript').returns({});

    ReactDOM.render(<Feedback
      labelText = 'Some fake label text'
      feedbackifyCode = '999' />,
      node);

    injectStub.restore();

    expect(injectStub.called).to.equal(false);
  });

});