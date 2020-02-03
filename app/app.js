import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';
import Profile from './Pages/Profile';
import * as constants from './constants';
import Navigation from './Pages/Navigation';
import Organization from './Pages/Organization';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Route
        exact
        path={constants.PROFILE}
        component={() => (
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Profile />
          </div>
        )}
      />
      <Route
        exact
        path={constants.ORGANIZATION}
        component={() => <Organization />}
      />
    </Router>
  );
};

export default App;
