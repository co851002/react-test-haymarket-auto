import React from 'react';
import ConnectedEventsHandler, { EventsHandler } from 'containers/EventsHandler';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
const initialState = {
  eventsListener: {
    'click': {
      'CompMock': {
        '[object HTMLDocument]': 1
      }
    }
  }
};

const store = mockStore(initialState);

//Actions
import * as Actions from 'actionTypes'; 
/**
* Test for <EventsHandler /> ComponentType component.
* @test {EventsHandler}
*/

const props = {
  compName: 'CompMock',
  eventType: 'click',
  target: document,
  dispatch: () => {},
  onHandleEventsListener : () => {}
};

//Variables for dynamic tests
const newState = {};
const case1 = newState;

newState['click'] = {};

const case2 = newState;

newState['click'][props.compName] = {
  targets: []
};

const case3 = newState;

newState['click'][props.compName].targets.push('window');

const case4 = newState;

const eventsListenersCases = [
  case1,
  case2,
  case3,
  case4
];

describe('<EventsHandler />', () => {

  it('should be callable, but it should\'t render anything', () => {
    const wrapper = shallow(<EventsHandler { ...props } />);
    expect(wrapper).to.have.length(1);
    expect(wrapper.render()).to.have.length(0);
  });

  it('should have all the props', () => {
    const wrapper = shallow(<EventsHandler { ...props } />);
    expect(wrapper.instance().props).to.be.deep.equal(props);
  });  

  it('should call dispatchEvent in componentDidMount and add event listener', () => {

    const spyDispatchEvent = sinon.spy(EventsHandler.prototype, 'dispatchEvent');
    const spyAddEventListener = sinon.spy(props.target, 'addEventListener');
    const spyOnHandleEventsListener = sinon.spy(props, 'onHandleEventsListener');

    mount(<EventsHandler { ...props } />);
    expect(spyAddEventListener.calledOnce).to.equal(true);
    window.dispatchEvent(new Event('click'));
    expect(spyDispatchEvent.calledOnce).to.equal(true);
    
    spyDispatchEvent.restore();
    spyAddEventListener.restore();
    spyOnHandleEventsListener.restore();
  });

  it('should call dispatchEvent in componentDidMount and it shouldn\'t if the component has been unmounted', () => {
    const spyDispatchEvent = sinon.spy(EventsHandler.prototype, 'dispatchEvent');
    const spyRemoveEventListener = sinon.spy(props.target, 'removeEventListener');
    const spyOnHandleEventsListener = sinon.spy(props, 'onHandleEventsListener');

    const eventsListener = {
      'click': {
        'CompMock': {
          '[object HTMLDocument]': 1
        }
      }
    };

    const wrapper = mount(<EventsHandler { ...props } eventsListener = { eventsListener } />);
    //Let's unmount the component
    wrapper.unmount();
    //let's click
    window.dispatchEvent(new Event('click'));
    //onHandleEventsListener is not called as the event has been removed by removeEventListener 
    expect(spyOnHandleEventsListener.called).to.equal(false);
    spyRemoveEventListener.restore();
    expect(spyRemoveEventListener.calledOnce).to.equal(true);
    
    spyDispatchEvent.restore();
    spyRemoveEventListener.restore();
    spyOnHandleEventsListener.restore();
    
  });

  eventsListenersCases.forEach( ( eventListener, index ) => {

    it(`should call dispatch and addEventListener with the correct args case ${index+1}: `, () => {

      const stubAddEventListener = sinon.stub(props.target, 'addEventListener').callsFake(() => {});
      const stubDispatch = sinon.stub(props, 'dispatch').callsFake(() => {});

      const event = {
        type: Actions.ADD_EVENTS_LISTENER,
        eventType: props.eventType,
        compName:  props.compName,
        target: props.target.toString()
      };

      mount(<EventsHandler { ...props } eventsListener = { eventListener } />);

      window.dispatchEvent(new Event('click'));

      stubAddEventListener.restore();
      stubDispatch.restore();
      
      expect(stubAddEventListener.calledOnce).to.equal(true);
      expect(stubAddEventListener.calledWith(props.eventType, props.onHandleEventsListener)).to.be.equal(true);

      expect(stubDispatch.called).to.equal(true);
      expect(stubDispatch.calledWith(event)).to.be.deep.equal(true);

    });

  });

  it('should call dispatch but not addEventListener if an event of the same type is already in the store', () => {

    const stubAddEventListener = sinon.stub(props.target, 'addEventListener').callsFake(() => {});
    const spyDispatchEvent = sinon.spy(EventsHandler.prototype, 'dispatchEvent');
    const stubDispatch = sinon.stub(props, 'dispatch').callsFake(() => {});

    mount(<Provider store = { store } >
      <ConnectedEventsHandler { ...props } />
    </Provider>);
        
    stubAddEventListener.restore();
    spyDispatchEvent.restore();
    stubDispatch.restore();

    expect(stubAddEventListener.called).to.equal(false);
    expect(spyDispatchEvent.called).to.equal(true);
    expect(stubDispatch.called).to.equal(false);

  });

  it('should return window when getTarget called with no target specified in props', () => {
    const wrapper = shallow(<EventsHandler />);
    expect(wrapper.instance().getTarget()).to.equal(window);
  });

  it('should return target prop when getTarget called with target in props', () => {
    const wrapper = shallow(<EventsHandler target = 'target' />);
    expect(wrapper.instance().getTarget()).to.equal('target');
  });
});