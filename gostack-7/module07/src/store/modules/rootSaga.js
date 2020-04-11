import { all } from 'redux-saga/effects';

import Cart from './cart/sagas';

function* rootSaga() {
  return yield all([Cart]);
}

export default rootSaga;
