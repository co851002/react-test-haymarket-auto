import React from 'react';
//hoc
import hover from 'hoc/Hover';
//components
import Item from 'presentational/Item';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
const toggleReference = 'visibleMenu';
const initialState = { toggle: { 'visibleMenu' : 1} };
const store = mockStore(initialState);

const HoverItem = hover(Item, toggleReference );

const props = {
  dataElemId: -1,
  toggleClass:'active',
  itemClasses: 'itemClass'
};


/**
* Test for <Hover /> ComponentType component.
* @test {Hover}
*/
describe('<Hover />', () => {

  /**
  * @test 
  */
  it('should render Hover', () => {
    const hocSelectFunc = sinon.stub();

    const wrapper = mount(<Provider store = { store } >
      <HoverItem { ...props } hocSelectFunc = { hocSelectFunc } />
    </Provider>);
    expect(wrapper).to.have.length(1);
  });

  it('should dispatch Toggle event when hocDefaultToEnabled true', () => {
    const hocSelectFunc = sinon.stub();

    const wrapper = mount(<HoverItem { ...props } hocDefaultToEnabled = { true } dataElemId = { 1 } hocSelectFunc = { hocSelectFunc } />);

    expect(wrapper).to.have.length(1);
    expect(hocSelectFunc.calledOnce).to.be.true;
    expect(hocSelectFunc.getCall(0).args[0]).to.deep.equal(1);
  });

  it('should dispatch Toggle event when hovering to new item', () => {
    const hocSelectFunc = sinon.stub();
    const wrapperWithInstance = shallow(<HoverItem
      hocDefaultToEnabled = { true }
      dataElemId = { 1 }
      hocSelectedId = { -1 }
      hocSelectFunc = { hocSelectFunc } />);
    wrapperWithInstance.instance().onHover();

    expect(hocSelectFunc.calledOnce).to.be.true;
    expect(hocSelectFunc.getCall(0).args[0]).to.deep.equal(1);
  });

  it('should not dispatch Toggle event when not hovering to new item', () => {
    const hocSelectFunc = sinon.stub();
    const wrapperWithInstance = shallow(<HoverItem
      hocDefaultToEnabled = { true }
      dataElemId = { 1 }
      hocSelectedId = { 1 }
      hocSelectFunc = { hocSelectFunc }
      dispatch = { hocSelectFunc } />);
    wrapperWithInstance.instance().onHover();

    expect(hocSelectFunc.called).to.be.false;
  });
});