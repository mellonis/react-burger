import cs from 'classnames';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Ingredient_t } from '../../../types';
import { BurgerIngredient } from '../burger-ingredient';
import style from './style.module.css';

const BurgerIngredientType = ({
  className,
  ingredients,
  title,
  type,
}: {
  className?: string;
  ingredients: Ingredient_t[];
  title: string;
  type: string;
}) => {
  const location = useLocation();
  const history = useHistory();

  return (
    <li className={cs('pt-10', className)} data-type={type}>
      <div className={'text text_type_main-medium'}>{title}</div>
      <ul
        className={cs(
          style['burger-ingredient-type__ingredient-list'],
          'pt-6 pr-4 pl-4'
        )}
      >
        {ingredients.map((ingredient, ix) => (
          <React.Fragment key={ingredient._id}>
            <BurgerIngredient
              ingredient={ingredient}
              onClick={() => {
                history.push({
                  pathname: `/ingredients/${ingredient._id}`,
                  state: {
                    backgroundPageLocation: location,
                  },
                });
              }}
            />
            <li
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

export { BurgerIngredientType };
