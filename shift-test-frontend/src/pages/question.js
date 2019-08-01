import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';

import BeatLoader from 'react-spinners/BeatLoader';
import {Formik} from 'formik';
import clsx from 'clsx';
import _ from 'lodash';

import {getQuestions, submitPerspective} from 'redux/perspective/actions'
import {questionsSelector} from 'redux/perspective/selectors'

export const isEmail = value => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)


function Question(props) {

  const dispatch = useDispatch();
  const questions = useSelector(questionsSelector, shallowEqual);
  const [loading, setLoading] = useState(false);

  if (!questions) {
    dispatch(getQuestions());
  }

  const validate = values => {
    const errors = {};
    
    _.keys(values).forEach(key => {
      if (!values[key]) {
        errors[key] = 'Email required';
        return;
      }
      
      if (key === 'email') {
        if (isEmail(values[key])) {
          return;
        } else {
          errors[key] = 'Invalid email';
        }
      }
    })
   
    return errors;
  }

  const handleSubmit = (values, {setSubmitting}) => {
    setLoading(true);
    setSubmitting(false);

    dispatch(submitPerspective({
      'body': values,
      'onSuccess': () => props.history.push('/result')
    }));
  }
    
  return (
    <>
      <div className='row'>
        <div className='col'>
          <h5 className='question-title'>Discover Your Perspective</h5>
          <p>Complete the 7 min test and get a detailed report of your lenses on the world.</p>
        </div>
      </div>
      <div className='row my-4 mx-md-auto question-panel'>
        <div className='col text-center'>
          {(!questions || loading) && (
            <div className='loader'>
              <BeatLoader loading={!questions || loading}/>
            </div>
          )}
          {questions && (
            <Formik
              onSubmit={handleSubmit}
              validate={validate}
              initialValues={Object.assign(
                {},
                {'email': ''},
                ...Array(questions.length).fill(0).map((val, key) => ({[`answer_${questions[key].id}`]: null}))
              )}
            >
              {({handleSubmit, handleChange, handleBlur, errors, touched, isSubmitting}) => (
                <form onSubmit={handleSubmit}>
                  {questions.map(({content, id}) => (
                    <div
                      key={id}
                      className={clsx(
                        'border rounded p-4',
                        {'border-danger': touched[`answer_${id}`] && errors[`answer_${id}`]}
                      )}
                    >
                      <div className='question-box'>
                        <p><b>{content}</b></p>
                        <div className='d-flex justify-content-between'>
                          <span className='text-danger'>Disagree</span>
                          <div className={clsx(
                            "flex-grow-1 px-4",
                            "d-flex justify-content-around"
                          )}>
                            {Array(7).fill(0).map((v, key) => (
                              <div
                                className="custom-control custom-radio custom-control-inline m-0"
                                key={key}
                              >
                                <input
                                  type="radio"
                                  name={`answer_${id}`}
                                  onChange={handleChange}
                                  value={key + 1}
                                  id={`answer-${id}-${key}`}
                                  className="custom-control-input"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor={`answer-${id}-${key}`}
                                />
                              </div>
                            ))}
                          </div>
                          <span className='text-success'>Agree</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className='border rounded p-4 mb-4'>
                    <div className='question-box'>
                      <label htmlFor="email">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name='email'
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={clsx(
                          'form-control',
                          {'border-danger': touched.email && errors.email}
                        )}
                      />
                      <span className='text-danger mt-2'>
                        <small>{touched.email ? errors.email : ''}</small>
                      </span>
                    </div>
                  </div>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='btn btn-primary'
                  >
                    Save & continue
                  </button>
                </form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </>
  );
}

export default React.memo(Question);
