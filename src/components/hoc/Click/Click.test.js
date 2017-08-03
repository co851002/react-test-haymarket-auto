import React from 'react';
//hoc
import click from 'hoc/Click';
//components
import Item from 'presentational/Item';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const initialState = { toggle: { 'visibleMenu' : null} };
const store = mockStore(initialState);

const ClickItem = click(Item);

const props = {
  dataElemId: 1,
  hocOnDocumentDismiss: true,
  itemClasses: 'itemClass'
};


/**
* Test for <Click /> ComponentType component.
* @test {Click}
*/
describe('<Click />', () => {

  /**
  * @test 
  */
  it('should render Click', () => {
    const hocSelectFunc = sinon.stub();

    const wrapper = mount(<Provider store = { store } >
      <ClickItem { ...props } hocSelectFunc = { hocSelectFunc } />
    </Provider>);
    expect(wrapper).to.have.length(1);
  });

  it('should unmount Click and remove listeners', () => {
    const hocSelectFunc = sinon.stub();

    const wrapper = mount(<Provider store = { store } >
      <ClickItem { ...props } hocSelectFunc = { hocSelectFunc } hocOnDocumentDismiss = { false } />
    </Provider>);
    expect(wrapper).to.have.length(1);
    wrapper.unmount();
  });

  it('should render a clickable Item with the correct props', () => {
    const hocSelectFunc = sinon.stub();

    const wrapper = mount(<Provider store = { store } >
      <ClickItem { ...props } hocSelectFunc = { hocSelectFunc } />
    </Provider>);

    let element = `[data-elemId=${props.dataElemId}]`;

    expect(wrapper.find(element)).to.have.length(1);
    expect(wrapper.find(element).prop('className')).to.equal('itemClass');
    expect(wrapper.find(Item).prop('hocOnDocumentDismiss')).to.equal(true);
    expect(wrapper.find('Item').prop('itemClasses')).to.equal('itemClass');
    expect(wrapper.find('Item').prop('hocOnDocumentDismiss')).to.equal(true);
    expect(wrapper.find('Item').prop('dataElemId')).to.equal(1);
  });

  /**
  * @test 
  */
  it('should call toggle func to enable non-selected item when clicked', () => {

    const hocSelectFunc = sinon.stub();

    const wrapper = mount(<ClickItem { ...props } hocSelectFunc = { hocSelectFunc } hocSelectedId = { -1 } />);
    
    wrapper.find(Item).simulate('click');//it's not a real event. This works only on the onClick prop.

    expect(hocSelectFunc.calledOnce).to.be.true;
    expect(hocSelectFunc.getCall(0).args[0]).to.deep.equal(1);
  });

  /**
  * @test 
  */
  it('should call toggle func to disable already selected item when clicked', () => {

    const hocSelectFunc = sinon.stub();

    const wrapper = mount(<ClickItem { ...props } hocSelectFunc = { hocSelectFunc } hocSelectedId = { 1 } />);
    
    wrapper.find(Item).simulate('click');//it's not a real event. This works only on the onClick prop.

    expect(hocSelectFunc.calledOnce).to.be.true;
    expect(hocSelectFunc.getCall(0).args[0]).to.deep.equal(null);
  });

  /**
  * @test 
  */
  it('should call toggle when window clicked off any item', () => {
    const spyhandleEventListener = sinon.spy(ClickItem.prototype, 'handleEventListener');
    const hocSelectFunc = sinon.stub();

    const wrapper = mount(<ClickItem { ...props } hocSelectFunc = { hocSelectFunc } />);
    
    window.dispatchEvent(new Event('click'));

    spyhandleEventListener.restore();
    expect(spyhandleEventListener.calledOnce).to.be.true;

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

    //Second case with an actual number
    const elementTarget2 = {
      dataset: {
        elemId: 2
      },
      parentElement: {
        dataset: {
          elemId: 2
        }
      }
    };
    wrapper.instance().handleDismissOnDocument(
      { 
        type: 'h1',
        target: elementTarget1
      },
      'fakeRef');
      
    expect(hocSelectFunc.called).to.be.true;
    expect(hocSelectFunc.calledOnce).to.be.true;

    wrapper.instance().handleDismissOnDocument(
      { 
        type: 'h1',
        target: elementTarget2
      },
      null);

    expect(hocSelectFunc.called).to.be.true;
    expect(hocSelectFunc.calledOnce).to.be.true;
    
  });

});