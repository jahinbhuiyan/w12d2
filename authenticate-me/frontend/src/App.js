import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import LoginFormPage from './components/LoginFormPage/index'
import SignupFormPage from './components/SignupFormPage';

function App() {
  return (
    <>
      <Navigation />
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
    </Switch>
    </>
  );
}

export default App;
