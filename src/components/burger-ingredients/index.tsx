import React, { useMemo, useState } from 'react';
import cs from 'classnames';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientType from './burger-ingredient-type';
import style from './style.module.css';

import ingredients from '../../utils/data';

const ingredientTypeTitles = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки',
};
const ingredientTypes = Object.keys(ingredientTypeTitles);

const BurgerIngredients = ({ className }: { className?: string }) => {
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
  }, []);

  return (
    <div className={cs(style['burger-ingredients'], className)}>
      <div
        className={cs(
          style['burger-ingredients__title'],
          'pt-10 pb-5 text text_type_main-large '
        )}
      >
        Соберите бургер
      </div>
      <div className={cs(style['burger-ingredients__filter'])}>
        {ingredientTypes.map((type) => (
          <Tab
            active={selectedIngredientType === type}
            value={type}
            onClick={setSelectedIngredientType}
          >
            {(ingredientTypeTitles as any)[type]}
          </Tab>
        ))}
      </div>
      <ul className={style['burger-ingredients__type-list']}>
        <BurgerIngredientType
          title={
            ingredientTypeTitles[
              selectedIngredientType as 'bun' | 'sauce' | 'main'
            ]
          }
          ingredients={ingredientTypeToIngredientsMap.get(
            selectedIngredientType
          )}
        />
      </ul>
    </div>
  );
};

export default BurgerIngredients;
