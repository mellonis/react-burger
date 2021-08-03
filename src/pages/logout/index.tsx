import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { logout, UserLoginPhase } from '../../services/reducers';
import { useAppDispatch, useAppSelector } from '../../services/store';

const LogoutPage = () => {
  const { userLoginPhase } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userLoginPhase === UserLoginPhase.fulfilled) {
      dispatch(logout());
    }
  });

  if (
    [
      UserLoginPhase.initial,
      UserLoginPhase.pending,
      UserLoginPhase.rejected,
    ].includes(userLoginPhase)
  ) {
    return <Redirect to={'/login'} />;
  }

  return null;
};

export { LogoutPage };
