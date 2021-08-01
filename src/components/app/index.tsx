import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchIngredients } from '../../services/reducers';

import { AppHeader } from '../app-header';
import { AppBody } from '../app-body';

import style from './style.module.css';

const App = () => {
  const { ingredientsError, ingredientsRequest } = useAppSelector(
    (state) => state.burger
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={style.app}>
      <Router>
        <AppHeader />
        {!ingredientsRequest && !ingredientsError && <AppBody />}
      </Router>
    </div>
  );
};

export { App };
