import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { Ingredient_t } from '../../../types';
import { useAppDispatch } from '../../../services/store';
import { setDetailedIngredient } from '../../../services/reducers';
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
  const dispatch = useAppDispatch();

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
                dispatch(setDetailedIngredient(ingredients[ix]));
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

BurgerIngredientType.propTypes = {
  className: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export { BurgerIngredientType };
