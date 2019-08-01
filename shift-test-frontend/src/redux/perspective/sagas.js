import { takeLatest } from 'redux-saga/effects'
import { types } from './actions'
import api from '../api/sagas'


const getQuestions = api({
  type: types.GET_QUESTIONS,
  url: '/questions'
})

const submitPerspective = api({
  method: 'post',
  type: types.SUBMIT_PERSPECTIVE,
  url: '/submit'
})

export default function* rootSaga () {
  yield takeLatest(types.GET_QUESTIONS, getQuestions)
  yield takeLatest(types.SUBMIT_PERSPECTIVE, submitPerspective)
}
