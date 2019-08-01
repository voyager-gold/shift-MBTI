import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import { requestPending, requestSuccess, requestFail } from './request'

axios.defaults.baseURL = process.env.REACT_APP_SERVER

const defaultHeaders = {
  'Accept':       'application/json',
  'Content-Type': 'application/json'
}

export default ({
  type,
  method,
  url,
  header,
  success,
  fail,
  payloadSuccess,
  payloadFail
}) => function* ({ payload }) {
  const {
    body,
    params,
    onSuccess,
    onFail
  } = payload || {};

  try {
    
    yield put({
      type: requestPending(type)
    });
    
    const res = yield call(axios.request, {
      url:      typeof(url) === 'function' ? url(payload) : url,
      method:   method || 'get',
      headers:  Object.assign({}, defaultHeaders, header),
      data:     body,
      params
    })

    const { data } = res
    
    yield put({
      type: requestSuccess(type),
      payload: payloadSuccess && typeof(payloadSuccess) === 'function'
                ? payloadSuccess(data) : data
    })

    onSuccess && typeof(onSuccess) === 'function' && onSuccess(data)

    if (success && typeof(success) === 'function') {
      yield call(success, data)
    }
    
  } catch (err) {

    const { response, request, message } = err

    if (response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      const { status, data } = response
      console.warn(`Request error ${status}: ${data}`)

    } else if (request) {
      // The request was made but no response was received
      console.warn(`Request error ${request}`, request)

    } else {
      // Something happened in setting up the request that triggered an Error
      console.warn(`Request error ${request}`, message)
    }
  }
}
