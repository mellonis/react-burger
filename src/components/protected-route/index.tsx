import React, { FC } from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { UserLoginPhase } from '../../services/reducers';
import { useAppSelector } from '../../services/store';

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { userLoginPhase } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();

  return (
    <Route
      {...rest}
      render={() =>
        userLoginPhase === UserLoginPhase.fulfilled ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                redirectedFrom: pathname,
              },
            }}
          />
        )
      }
    />
  );
};

export { ProtectedRoute };
