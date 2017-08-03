import React from 'react';
import * as Actions from 'actionTypes';
//hoc
import toggle from 'hoc/Toggle';
//components
import Item from 'presentational/Item';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
const toggleReference = 'visibleMenu';
const initialState = { toggle: { 'visibleMenu' : null} };
const store = mockStore(initialState);

import { Toggle } from 'hoc/Toggle';

const ToggleItem = toggle(Item, toggleReference );

const props = {
  injectedElemId: -1,
  toggleOnDocument: true,
  toggleClass:'active',
  itemClasses: 'itemClass',
  dispatch: sinon.stub(),
  eventCallback: () => {}
};

/**
* Test for <Toggle /> ComponentType component.
* @test {Toggle}
*/
describe('<Toggle />', () => {

  /**
  * @test 
  */
  it('should render Toggle', () => {
    const wrapper = mount(<Provider store = { store } >
      <ToggleItem />
    </Provider>);
    expect(wrapper).to.have.length(1);
  });

  it('should unmount Toggle and remove listeners', () => {
    const wrapper = mount(<Provider store = { store } >
      <ToggleItem toggleOnDocument = { true } />
    </Provider>);
    expect(wrapper).to.have.length(1);
    wrapper.unmount();
  });

  it('should render an clickable Item with the correct props', () => {
    
    const wrapper = mount(<Provider store = { store } >
      <ToggleItem { ...props } />
    </Provider>);

    let element = `[data-elemId=${props.injectedElemId}]`;

    expect(wrapper.find(element)).to.have.length(1);
    expect(wrapper.find(element).prop('className')).to.equal('itemClass');
    expect(wrapper.find(Item).prop('toggleOnDocument')).to.equal(true);
    expect(wrapper.find('Connect(Toggle)').prop('itemClasses')).to.equal('itemClass');
    expect(wrapper.find('Connect(Toggle)').prop('toggleOnDocument')).to.equal(true);
    expect(wrapper.find('Connect(Toggle)').prop('injectedElemId')).to.equal(-1);

  });

  it('should call handleEventListener and handleToggleOnDocument twice, but dispatchToggleEvent once', () => {
    const wrapper = mount(<Toggle { ...props } toggle = { { visibleMenu: -5 } } reference = { toggleReference }  toggleOnDocument = { false } />);
    const spyhandleEventListener = sinon.spy(wrapper.instance(), 'handleEventsListener');
    const spyhandleToggleOnDocument = sinon.spy(wrapper.instance(), 'handleToggleOnDocument');
    const stubDispatchToggleEvent = sinon.stub(wrapper.instance(), 'dispatchToggleEvent', () => {});

    //first case with null
    const elementTarget1 = {
      dataset: {
        elemId: null
      },
      parentElement: {
        dataset: {
          elemId: null
        }
      }
    };

    wrapper.instance().handleEventsListener(null);
    wrapper.instance().handleEventsListener({ 
      type: 'h1',
      target: elementTarget1
    });

    spyhandleEventListener.restore();
    spyhandleToggleOnDocument.restore();
    stubDispatchToggleEvent.restore();

    expect(spyhandleEventListener.called).to.be.true;
    expect(spyhandleEventListener.calledTwice).to.be.true;
    expect(spyhandleToggleOnDocument.called).to.be.true;
    expect(spyhandleToggleOnDocument.calledTwice).to.be.true;
    expect(stubDispatchToggleEvent.called).to.be.true;
    expect(stubDispatchToggleEvent.calledOnce).to.be.true;    
    
  });

  it('should call the dispatch prop when dispatchToggleEvent is called', () => {
    const wrapper = mount(<Toggle { ...props } toggle = { { visibleMenu: -5 } } reference = { toggleReference }  toggleOnDocument = { false } />);
 
    const element = 'elementId';
    const expected = {
      type: Actions.TOGGLE,
      compRef: toggleReference,
      element: element
    };

    wrapper.instance().dispatchToggleEvent(element);

    expect(props.dispatch.calledWith(expected)).to.be.true;
  });   

  it('should call handleEventListener, but not dispatchToggleEvent', () => {

    const wrapper = mount(<Toggle { ...props } toggle = { { visibleMenu: null } } reference = { toggleReference }  toggleOnDocument = { false } />);

    const spyhandleEventListener = sinon.spy(wrapper.instance(), 'handleEventsListener');
    const spyhandleToggleOnDocument = sinon.spy(wrapper.instance(), 'handleToggleOnDocument');
    const stubDispatchToggleEvent = sinon.stub(wrapper.instance(), 'dispatchToggleEvent', () => {});

    //first case with null
    const elementTarget2 = <h1>{ 'test' }</h1>;

    wrapper.instance().handleEventsListener({ 
      type: 'h1',
      target: elementTarget2
    });

    spyhandleEventListener.restore();
    spyhandleToggleOnDocument.restore();
    stubDispatchToggleEvent.restore();

    expect(spyhandleEventListener.called).to.be.true;
    expect(spyhandleEventListener.calledOnce).to.be.true;

    expect(spyhandleToggleOnDocument.called).to.be.true;
    expect(spyhandleToggleOnDocument.calledOnce).to.be.true;

    expect(stubDispatchToggleEvent.called).to.be.false;
    expect(stubDispatchToggleEvent.calledOnce).to.be.false;    
    
  });

});
