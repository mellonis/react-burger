import React, { useEffect } from 'react';
import { Ingredient_t } from '../../types';
import { apiHostUrl } from '../../consts';
import { setIngredients } from '../../services/reducers';
import { useAppDispatch } from '../../services/store';

import AppHeader from '../app-header';
import AppBody from '../app-body';

import style from './style.module.css';

export const fetchIngredients = async (): Promise<Ingredient_t[]> => {
  const response = await fetch(`${apiHostUrl}/api/ingredients`);
  const result = await response.json();

  if (result.success === true) {
    return result.data;
  } else {
    throw new Error("Can't get data from server");
  }
};

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchIngredients()
      .then((ingredients) => {
        dispatch(setIngredients(ingredients));
      })
      .catch(console.error);
  }, [dispatch]);

  return (
    <div className={style.main}>
      <AppHeader />
      <AppBody />
    </div>
  );
};

export default App;
