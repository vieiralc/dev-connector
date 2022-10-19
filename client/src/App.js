import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './components/routing/Routes';
import { Provider } from 'react-redux';
import store from './redux/store';

import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/routing/PrivateRoute';

import setAuthToken from './utils/setAuthToken';
import { loadUser } from './redux/actions/auth/loadUser';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Navbar />
      <Alert />
      <Routes>
        {ROUTES.map((route) =>
          route.private ? (
            <Route
              key={route.key}
              exact
              path={route.path}
              element={<PrivateRoute>{route.component}</PrivateRoute>}
            />
          ) : (
            <Route
              key={route.key}
              exact
              path={route.path}
              element={route.component}
            />
          )
        )}
      </Routes>
    </Provider>
  );
};

export default App;
