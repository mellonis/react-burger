import React, { useCallback, useState } from 'react';
import cs from 'classnames';
import { Ingredient_t } from '../../../types';
import { lexemes } from '../../../consts';
import BurgerIngredient from '../BurgerIngredient';
import IngredientDetails from '../../IngredientDetails';
import Modal from '../../Modal';

import style from './style.module.css';

const BurgerIngredientType = ({
  title,
  ingredients,
}: {
  title: string;
  ingredients: Ingredient_t[];
}) => {
  const [detailedIngredient, setDetailedIngredient] = useState(
    null as Ingredient_t | null
  );
  const handleClick = useCallback(
    (ix: number) => {
      setDetailedIngredient(ingredients[ix]);
    },
    [ingredients]
  );

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
            <BurgerIngredient
              data={ingredient}
              onClick={() => handleClick(ix)}
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
      {detailedIngredient && (
        <Modal
          onClose={() => setDetailedIngredient(null)}
          title={lexemes.ingredientDetails}
        >
          <IngredientDetails
            className={style['burger-ingredient-type__ingredient-details']}
            ingredient={detailedIngredient}
          />
        </Modal>
      )}
    </li>
  );
};

export default BurgerIngredientType;
