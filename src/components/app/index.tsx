import React from 'react';
import {
  IngredientContext,
  useIngredientContextValue,
} from '../../contexts/ingredient-context';
import AppHeader from '../app-header';
import AppBody from '../app-body';

import style from './style.module.css';

const App = () => {
  const ingredientContextValue = useIngredientContextValue();

  return (
    <IngredientContext.Provider value={ingredientContextValue}>
      <div className={style.app}>
        <AppHeader />
        <AppBody />
      </div>
    </IngredientContext.Provider>
  );
};

export default App;
