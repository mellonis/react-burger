import React from 'react';
import {
  IngredientContext,
  useIngredientsContextValue,
} from '../../contexts/ingredient-context';
import AppHeader from '../app-header';
import AppBody from '../app-body';

import style from './style.module.css';

const App = () => {
  const ingredientsContextValue = useIngredientsContextValue();

  return (
    <IngredientContext.Provider value={ingredientsContextValue}>
      <div className={style.app}>
        <AppHeader />
        <AppBody />
      </div>
    </IngredientContext.Provider>
  );
};

export default App;
