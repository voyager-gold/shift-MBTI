import { call } from 'redux-saga/effects';
import perspective from './perspective/sagas';


export default function* rootSaga() {
  yield call(perspective)
}
