import { all, fork } from 'redux-saga/effects';

import ideasSaga from './ideas/sagas';

export function* rootSaga() {
  yield all([fork(ideasSaga)]);
}
