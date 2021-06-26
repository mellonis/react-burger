import React, { useMemo, useState } from 'react';
import cs from 'classnames';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useIngredientsContextValue } from '../../contexts/IngredientContext';
import BurgerIngredientType from './BurgerIngredientType';

import style from './style.module.css';

const ingredientTypeTitles = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки',
};
const ingredientTypes = Object.keys(ingredientTypeTitles);

const BurgerIngredients = ({ className }: { className?: string }) => {
  const { ingredients } = useIngredientsContextValue();
  const [selectedIngredientType, setSelectedIngredientType] = useState(
    ingredientTypes[0]
  );
  const ingredientTypeToIngredientsMap = useMemo(() => {
    const axillaryMap = new Map();

    ingredients.forEach((ingredient) => {
      const { type } = ingredient;

      if (!axillaryMap.has(type)) {
        axillaryMap.set(type, []);
      }

      axillaryMap.get(type).push(ingredient);
    });

    const result = ingredientTypes.reduce((result, ingredientType) => {
      if (axillaryMap.has(ingredientType)) {
        result.set(ingredientType, axillaryMap.get(ingredientType));
      } else {
        result.set(ingredientType, []);
      }

      return result;
    }, new Map());

    axillaryMap.clear();

    return result;
  }, [ingredients]);

  return (
    <div className={cs(style['burger-ingredients'], 'pb-5', className)}>
      <div
        className={cs(
          style['burger-ingredients__title'],
          'pt-10 pb-5 text text_type_main-large'
        )}
      >
        Соберите бургер
      </div>
      <div className={cs(style['burger-ingredients__filter'])}>
        {ingredientTypes.map((type) => (
          <Tab
            key={type}
            active={selectedIngredientType === type}
            value={type}
            onClick={setSelectedIngredientType}
          >
            {(ingredientTypeTitles as any)[type]}
          </Tab>
        ))}
      </div>
      <ul className={style['burger-ingredients__type-list']}>
        {Array.from(ingredientTypeToIngredientsMap.entries()).map(
          ([type, ingredients]) => (
            <BurgerIngredientType
              key={type}
              title={ingredientTypeTitles[type as 'bun' | 'sauce' | 'main']}
              ingredients={ingredients}
            />
          )
        )}
      </ul>
    </div>
  );
};

export default BurgerIngredients;
