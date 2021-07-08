import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { useSelector } from 'react-redux';
import { Ingredient_t } from '../../../types';
import { RootState } from '../../../services/store';
import Amount from '../../amount';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './style.module.css';

const BurgerIngredient = ({
  ingredient: { _id, image, name: title, price },
  onClick,
}: {
  ingredient: Ingredient_t;
  onClick?: () => void;
}) => {
  const { idToActualIngredientsCountMap } = useSelector(
    (state: RootState) => state.main
  );

  return (
    <li
      className={cs(style['burger-ingredient'], {
        [style['burger-ingredient_interactive']]: onClick,
      })}
      onClick={onClick}
    >
      {idToActualIngredientsCountMap[_id] && (
        <Counter count={idToActualIngredientsCountMap[_id]} />
      )}
      <div
        className={cs(style['burger-ingredient__image-wrapper'], 'pl-4 pr-4')}
      >
        <img
          alt={title}
          className={style['burger-ingredient__image']}
          src={image}
        />
      </div>
      <Amount
        amount={price}
        className={cs(style['burger-ingredient__price-wrapper'], 'pt-1 pb-1')}
      />
      <div className={cs(style['burger-ingredient__title'])}>{title}</div>
    </li>
  );
};

BurgerIngredient.propTypes = {
  ingredient: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default BurgerIngredient;
