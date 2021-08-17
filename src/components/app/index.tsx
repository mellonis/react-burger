import React, { FC, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  AutoLoginPhase,
  doAutoLogin,
  fetchIngredients,
  subscribeForOrders,
} from '../../services/reducers';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { AppBody } from '../app-body';
import { AppHeader } from '../app-header';
import style from './style.module.css';

const App: FC = () => {
  const { ingredientsError, ingredientsRequest } = useAppSelector(
    (state) => state.burger
  );
  const { autoLoginPhase } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(doAutoLogin());
  }, [dispatch]);

  useEffect(() => {
    dispatch(subscribeForOrders());
  }, [dispatch]);

  if (
    ![AutoLoginPhase.fulfilled, AutoLoginPhase.rejected].includes(
      autoLoginPhase
    )
  ) {
    return null;
  }

  return (
    <div className={style.app}>
      <Router basename={process.env.PUBLIC_URL}>
        <AppHeader />
        {!ingredientsRequest && !ingredientsError && <AppBody />}
      </Router>
    </div>
  );
};

export { App };
