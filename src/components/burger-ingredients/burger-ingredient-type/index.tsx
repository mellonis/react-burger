import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Ingredient_t } from '../../../types';
import { RootState } from '../../../services/store';
import {
  resetDetailedIngredient,
  setDetailedIngredient,
} from '../../../services/reducers';
import { lexemes } from '../../../consts';
import BurgerIngredient from '../burger-ingredient';
import IngredientDetails from '../../ingredient-details';
import Modal from '../../modal';

import style from './style.module.css';

const BurgerIngredientType = ({
  title,
  ingredients,
}: {
  title: string;
  ingredients: Ingredient_t[];
}) => {
  const { detailedIngredient } = useSelector((state: RootState) => state.main);
  const [isIngredientDetailsShown, setIsIngredientDetailsShown] = useState(
    false
  );
  const dispatch = useDispatch();
  const onCloseHandler = useCallback(() => {
    dispatch(resetDetailedIngredient());
    setIsIngredientDetailsShown(false);
  }, [dispatch]);

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
          <React.Fragment key={ingredient._id}>
            <BurgerIngredient
              ingredient={ingredient}
              onClick={() => {
                dispatch(setDetailedIngredient(ingredients[ix]));
                setIsIngredientDetailsShown(true);
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
      {isIngredientDetailsShown && detailedIngredient && (
        <Modal onClose={onCloseHandler} title={lexemes.ingredientDetails}>
          <IngredientDetails
            className={style['burger-ingredient-type__ingredient-details']}
            ingredient={detailedIngredient}
          />
        </Modal>
      )}
    </li>
  );
};

BurgerIngredientType.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BurgerIngredientType;
