import React from 'react';
import {
  IngredientContext,
  OrderContext,
  useIngredientContextValue,
  useOrderContextValue,
} from '../../contexts';
import AppHeader from '../app-header';
import AppBody from '../app-body';

import style from './style.module.css';

const App = () => {
  const ingredientContextValue = useIngredientContextValue();
  const orderContextValue = useOrderContextValue();

  return (
    <IngredientContext.Provider value={ingredientContextValue}>
      <OrderContext.Provider value={orderContextValue}>
        <div className={style.app}>
          <AppHeader />
          <AppBody />
        </div>
      </OrderContext.Provider>
    </IngredientContext.Provider>
  );
};

export default App;
