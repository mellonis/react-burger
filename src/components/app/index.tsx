import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchIngredients } from '../../services/reducers';

import { AppHeader } from '../app-header';
import { AppBody } from '../app-body';

import style from './style.module.css';

const App = () => {
  const { ingredientsError, ingredientsRequest } = useAppSelector(
    (state) => state.main
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={style.main}>
      <AppHeader />
      {!ingredientsRequest && !ingredientsError && <AppBody />}
    </div>
  );
};

export { App };
