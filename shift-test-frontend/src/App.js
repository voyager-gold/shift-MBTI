import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import Question from 'pages/question';
import Perspective from 'pages/perspective';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className='container my-5'>
      <BrowserRouter>
        <Switch>
          <Route
            path='/'
            exact
            component={Question} />
          <Route
            path='/result'
            component={Perspective} />
          <Route
            component={() => <Redirect to='/'/>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default React.memo(App);
