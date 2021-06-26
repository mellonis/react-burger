import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Ingredient_t } from '../../types';

export const IngredientContext = React.createContext({
  ingredients: [],
  idToIngredientMap: new Map(),
} as {
  ingredients: Ingredient_t[];
  idToIngredientMap: Map<string, Ingredient_t>;
});

export const useIngredientContextValue = () => useContext(IngredientContext);

export const getIngredients = async (): Promise<Ingredient_t[]> => {
  const response = await fetch(
    'https://norma.nomoreparties.space/api/ingredients'
  );
  const result = await response.json();

  if (result.success === true) {
    return result.data;
  } else {
    throw new Error("Can't get data from server");
  }
};

export const useIngredientsContextValue = () => {
  const [ingredients, setIngredients] = useState([] as Ingredient_t[]);

  const idToIngredientMap: Map<string, Ingredient_t> = useMemo(
    () =>
      ingredients.reduce((result, ingredient) => {
        result.set(ingredient._id, ingredient);

        return result;
      }, new Map()),
    [ingredients]
  );

  useEffect(() => {
    getIngredients().then(setIngredients).catch(console.error);
  }, []);

  return { ingredients, idToIngredientMap };
};
