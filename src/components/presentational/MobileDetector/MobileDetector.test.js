import React from 'react';
import { MobileDetector } from './index';

// Actions
import * as Actions from 'actionTypes';
//Style
import bootstrap from 'vendor/bootstrap/_bootstrap_custom.scss';

describe('<MobileDetector />', () => {
  it('should render', () => {

    const wrapper = render(
      <MobileDetector />
    );
    expect(wrapper.find('#md')).to.have.length(1);
  });

  it('should have the bootstrap class visibleXs', () => {
    const wrapper = shallow(<MobileDetector />);

    expect(wrapper.find('#md').hasClass(bootstrap.visibleXs)).to.be.true;

  });

  it('should trigger getViewportSize on mount and on resize', () => {
    const stub = sinon.stub(MobileDetector.prototype, 'getViewportSize');

    mount(
      <MobileDetector />
    );
    expect(stub.called).to.be.true;
    expect(stub.callCount).to.be.equal(1);

    window.dispatchEvent(new Event('resize'));
    stub.restore();
    expect(stub.callCount).to.be.equal(2);
  });

  it('should attach and detach events corrently', () => {
    const props = {
      dispatch: function() {}
    };
    const qs = sinon.stub(document, 'querySelector').returns({
      offsetWidth: 100
    });
    //It stubs the return of the funcion querySelector
    const el = sinon.stub(window, 'addEventListener');

    const wrapper = mount(
      <MobileDetector { ...props } />
    );
    el.restore();
    qs.restore();
    //stub.restore();
    expect(el.calledOnce).to.be.true;
    expect(el.getCall(0).args[0]).to.equal('resize');
    expect(el.getCall(0).args[1].name).to.equal('bound getViewportSize');
    const rel = sinon.stub(window, 'removeEventListener');
    wrapper.unmount();
    rel.restore();
    expect(rel.calledOnce).to.be.true;
    expect(rel.calledWith('resize', 'getViewportSize'));
  });

  it('should dispatch SET_VIEWPORT_MOBILE correctly with true', () => {
    const props = {
      dispatch: sinon.stub()
    };
    //It stubs the return of the funcion querySelector
    const qs = sinon.stub(document, 'querySelector').returns({
      offsetWidth: 100
    });
    mount(
      <MobileDetector { ...props } />
    );
    const expected = {
      type: Actions.SET_VIEWPORT_MOBILE,
      isMobile: true
    };
    qs.restore();
    expect(props.dispatch.getCall(0).args[0]).to.deep.equal(expected);
  });

  it('should dispatch SET_VIEWPORT_MOBILE correctly with false', () => {
    const props = {
      dispatch: sinon.stub()
    };
    //It stubs the return of the funcion querySelector
    const qs = sinon.stub(document, 'querySelector').returns({
      offsetWidth: 0
    });
    mount(
      <MobileDetector { ...props } />
    );
    const expected = {
      type: Actions.SET_VIEWPORT_MOBILE,
      isMobile: false
    };
    qs.restore();
    expect(props.dispatch.calledWith(expected)).to.equal(true);
  });
});
