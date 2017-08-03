// TODO: Once more sagas are implemented should be sepperated into different files.
//
import rootSaga, {
  watchMenuRequests,
  watchMenuFetch,
  watchPropsRequests,
  watchPropsFetch
} from './index';

import * as Actions from 'actionTypes';
import * as API from 'api';
import {call, put, fork, takeEvery} from 'redux-saga/effects';

describe('rootSaga', () => {
  const generator = rootSaga();

  it('should have an array of all watchers', () => {
    expect(generator.next().value)
      .to.deep.equal([
        fork(watchMenuRequests),
        fork(watchPropsRequests)
      ]);
  });

  it('should not do anything else', () => {
    expect(generator.next())
      .to.deep.equal({ done: true, value: undefined });
  });
});

describe('watchMenuRequests saga', () => {
  const generator = watchMenuRequests();

  it('should takeEvery FETCH_MENU action', () => {
    expect(generator.next().value)
      .to.deep.equal(takeEvery(Actions.FETCH_MENU, watchMenuFetch));
  });

  it('should not do anything else', () => {
    expect(generator.next())
      .to.deep.equal({ done: true, value: undefined });
  });
});

describe('watchMenuFetch saga', () => {
  const mockAction = {mids: ['test-menu'], menuName: 'visible'};
  const generator = watchMenuFetch(mockAction);

  it('should perform a fetch API action', () => {
    expect(generator.next().value)
      .to.deep.equal(call(API.fetchMenu, mockAction.mids));
  });

  it('should put a APPLY_MENU with the result', () => {
    expect(generator.next('Fake Result').value)
      .to.deep.equal(put({
        type: Actions.APPLY_MENU,
        result: 'Fake Result'
      }));
  });

  it('shouldn\'t put a MERGE_MENU with only one menu', () => {
    expect(generator.next().value).to.equal(undefined);
  });

  it('should not do anything else', () => {
    expect(generator.next())
      .to.deep.equal({ done: true, value: undefined });
  });
});

describe('watchMenuFetch saga with multiple menus', () =>{
  const mockAction = { mids: ['test-menu','test-menu-2'] , menuName: 'visible' };
  const generator = watchMenuFetch(mockAction);
    
  it('should perform a fetch API action', () => {
    expect(generator.next().value)
        .to.deep.equal(call(API.fetchMenu, mockAction.mids));
  });

  it('should still put a APPLY_MENU with the result', () => {
    expect(generator.next('Fake Result').value)
      .to.deep.equal(put({
        type: Actions.APPLY_MENU,
        result: 'Fake Result'
      }));
  });

  it('should put a MERGE_MENU with the result if there are more than one menu to fetch', () => {
    expect(generator.next(mockAction.mids.length).value) //pass the value for the if
        .to.deep.equal(put({
          type: Actions.MERGE_MENUS,
          mids: mockAction.mids,
          menuName: mockAction.menuName,
          mergedMenusName: mockAction.mergedMenusName,
          result: 'Fake Result'
        }));
  });
});

describe('watchPropsRequests saga', () => {
  const generator = watchPropsRequests();

  it('should takeEvery FETCH_PROPS action', () => {
    expect(generator.next().value)
      .to.deep.equal(takeEvery(Actions.FETCH_PROPS, watchPropsFetch));
  });

  it('should not do anything else', () => {
    expect(generator.next())
      .to.deep.equal({ done: true, value: undefined });
  });
});

describe('watchPropsFetch saga', () => {
  const mockAction = {props: ['prop1', 'prop2']};
  const generator = watchPropsFetch(mockAction);

  it('should perform a fetch API action', () => {
    expect(generator.next().value)
      .to.deep.equal(call(API.fetchProps, mockAction.props));
  });

  it('should put a APPLY_PROPS with the reult', () => {
    expect(generator.next('Fake Reult').value)
      .to.deep.equal(put({
        type: Actions.APPLY_PROPS,
        result: 'Fake Reult'
      }));
  });

  it('should not do anything else', () => {
    expect(generator.next())
      .to.deep.equal({ done: true, value: undefined });
  });
});