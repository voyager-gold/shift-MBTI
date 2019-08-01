import { handleActions } from 'redux-actions'
import { requestSuccess } from '../api/request'
import { types  } from './actions'

export default handleActions({
  [requestSuccess(types.GET_QUESTIONS)]:
    (state, { payload }) => ({
      ...state,
      questions: payload
    }),

  [requestSuccess(types.SUBMIT_PERSPECTIVE)]:
    (state, { payload }) => ({
      ...state,
      result: payload
    })
}, {})
