import React, { ReactNode } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserLoginPhase } from '../../services/reducers';
import { useAppSelector } from '../../services/store';

const ProtectedRoute = ({
  children,
  ...rest
}: {
  children: ReactNode;
  [key: string]: any;
}) => {
  const { userLoginPhase } = useAppSelector((state) => state.user);

  return (
    <Route
      {...rest}
      render={() =>
        userLoginPhase === UserLoginPhase.fulfilled ? (
          children
        ) : (
          <Redirect to={'/login'} />
        )
      }
    />
  );
};

export { ProtectedRoute };
