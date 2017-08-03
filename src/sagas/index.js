// @flow

import * as Actions from 'actionTypes';
import * as API from 'api';
import {call, put, fork, takeEvery} from 'redux-saga/effects';

type MenuAction = {
  mids: Array<mixed>;
  menuName: string;
  mergedMenusName: string;
}

type PropsAction = {
  props: Array<mixed>;
}

/**
 * Saga that fetches menu items and disptaches an action to add them to the state.
 *
 * @param {Object} action - action that is being processed by the saga.
 * @prop {string} mid - menu id the action requests.
 * @return {Generator} current task.
 */
export function* watchMenuFetch(action : MenuAction) : Generator <*, *, *> {
  const result = yield call(API.fetchMenu, action.mids);
  yield put({
    type: Actions.APPLY_MENU,
    result
  });
  if(action.mids.length > 1)
  {
    yield put({
      type: Actions.MERGE_MENUS,
      mids: action.mids,
      menuName: action.menuName,
      mergedMenusName: action.mergedMenusName,
      result
    });  
  }
}

/**
 * Saga that fetches props and disptaches an action to add them to the state.
 *
 * @param {Object} action - action that is being processed by the saga.
 * @prop {array} props - array of properties to fetch from the API.
 * @return {Generator} current task.
 */
export function* watchPropsFetch(action : PropsAction) : Generator <*, *, *> {
  const result = yield call(API.fetchProps, action.props);
  yield put({
    type: Actions.APPLY_PROPS,
    result
  });
}

/**
 * Watches all {FETCH_MENU} actions starts {watchMenuFetch} saga.
 *
 * @return {Generator} - watcher for FETCH_MENU action.
 */
export function* watchMenuRequests() : Generator <*, *, *> {
  yield takeEvery(Actions.FETCH_MENU, watchMenuFetch);
}

/**
 * Root saga containing all sagas.
 * Watches all {FETCH_PROPS} actions starts {watchPropsFetch} saga.
 *
 * @return {Generator} - watcher for FETCH_PROPS action.
 */
export function* watchPropsRequests() : Generator <*, *, *> {
  yield takeEvery(Actions.FETCH_PROPS, watchPropsFetch);
}

/**
 * Root saga containing all sagas used in the application.
 *
 * @return {Generator} compilation of all sagas.
 */
export default function* rootSaga() : Generator <*, *, *>  {
  yield [
    fork(watchMenuRequests),
    fork(watchPropsRequests)
  ];
}