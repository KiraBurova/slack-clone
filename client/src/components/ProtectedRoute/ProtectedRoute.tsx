import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface ProtectedRouteProps {
  component: any;
  isLoggedIn: boolean;
  exact: boolean;
  path: string;
}

const ProtectedRoute = ({
  component: Component,
  isLoggedIn,
  ...rest
}: ProtectedRouteProps): React.ReactElement => {
  return (
    <Route
      {...rest}
      render={props => {
        if (isLoggedIn) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
