import { createAction } from 'redux-actions'

const GET_QUESTIONS = 'GET_QUESTIONS'
const SUBMIT_PERSPECTIVE = 'SUBMIT_PERSPECTIVE'

export const types = {
  GET_QUESTIONS,
  SUBMIT_PERSPECTIVE
}

export const getQuestions = createAction(GET_QUESTIONS)
export const submitPerspective = createAction(SUBMIT_PERSPECTIVE)
