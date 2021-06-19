import React from 'react';
import cs from 'classnames';
import BurgerIngredient, { Ingredient_t } from '../burger-ingredient';
import style from './style.module.css';

const BurgerIngredientType = ({
  title,
  ingredients,
}: {
  title: string;
  ingredients: Ingredient_t[];
}) => {
  return (
    <li className={'pt-10'}>
      <div className={'text text_type_main-medium'}>{title}</div>
      <ul
        className={cs(
          style['burger-ingredient-type__ingredient-list'],
          'pt-6 pr-4 pl-4'
        )}
      >
        {ingredients.map((ingredient, ix) => (
          <React.Fragment key={ix}>
            <BurgerIngredient data={ingredient} />
            <li
              key={`${ix}:g`}
              className={cs({
                'pl-6': ix % 2 === 0,
                'pt-8': ix % 2 === 1,
              })}
            />
          </React.Fragment>
        ))}
      </ul>
    </li>
  );
};

export default BurgerIngredientType;
