import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, redirectTo, ...rest}) => {
  console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectTo} />
        )
      }}
    />
  );
}

export default PrivateRoute;
