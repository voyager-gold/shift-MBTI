import React, {useEffect} from 'react';
import {useSelector, shallowEqual} from 'react-redux';

import {resultSelector} from 'redux/perspective/selectors'
import clsx from 'clsx';

function Perspective(props) {

  const result = useSelector(resultSelector, shallowEqual);
  const dimensions = [
    { 'first': 'Extraversion', 'second': 'Introversion', 'firstLetter': 'E', 'secondLetter': 'I' },
    { 'first': 'Sensing', 'second': 'Intuition', 'firstLetter': 'S', 'secondLetter': 'N' },
    { 'first': 'Thinking', 'second': 'Feeling', 'firstLetter': 'T', 'secondLetter': 'F' },
    { 'first': 'Judging', 'second': 'Perceiving', 'firstLetter': 'J', 'secondLetter': 'P' }
  ]
    
  if (!result) {
    props.history.push('/');
    return <div>Redirecting</div>
  }

  return (
    <div className='row border rounded p-5 m-3'>
      <div className='col-12 col-lg-6 d-flex'>
        <div className='my-auto'>
          <h5 className='question-title'>
            Your Perspective
          </h5>
          <p>Your Perspective Type is {result}</p>
        </div>
      </div>
      <div className='col-12 col-lg-6'>
        <table>
          <tbody>
            {dimensions.map(({first, second, firstLetter, secondLetter}, key) => (
              <tr key={key} className='dimension-item'>
                <td className='text-right text-secondary dimension-caption'>
                  <small>{first}({firstLetter})</small>
                </td>
                <td className='dimension-bar px-3'>
                  <div className='d-flex'>
                    <div className={clsx('rounded-left w-50', {'active': result[key] === firstLetter})}>&nbsp;</div>
                    <div className={clsx('rounded-right w-50', {'active': result[key] === secondLetter})}>&nbsp;</div>
                  </div>
                </td>
                <td className='text-secondary dimension-caption'>
                  <small>{second}({secondLetter})</small>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='col-12 mt-4'>
        <button
          className='btn btn-primary'
          onClick={() => props.history.push('/')}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default React.memo(Perspective);
