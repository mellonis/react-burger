import React from 'react';
import {
  IngredientContext,
  useIngredientsContextValue,
} from '../../contexts/IngredientContext';
import AppHeader from '../AppHeader';
import AppBody from '../AppBody';

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
