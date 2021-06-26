import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { Ingredient_t } from '../../../types';
import Amount from '../../Amount';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './style.module.css';

const BurgerIngredient = ({
  ingredient: { image, name: title, price },
  onClick,
}: {
  ingredient: Ingredient_t;
  onClick?: () => void;
}) => {
  return (
    <li
      className={cs(style['burger-ingredient'], {
        [style['burger-ingredient_interactive']]: onClick,
      })}
      onClick={onClick}
    >
      <Counter count={1} />
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
