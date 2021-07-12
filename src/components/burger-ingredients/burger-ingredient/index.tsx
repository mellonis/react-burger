import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { DragPreviewImage, useDrag } from 'react-dnd';
import {
  DraggableTypes,
  Ingredient_t,
  IngredientDragItem,
} from '../../../types';
import { useAppSelector } from '../../../services/store';
import Amount from '../../amount';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './style.module.css';

const BurgerIngredient = ({
  ingredient: { _id, image, name: title, price, type },
  onClick,
}: {
  ingredient: Ingredient_t;
  onClick?: () => void;
}) => {
  const { idToActualIngredientsCountMap } = useAppSelector(
    (state) => state.main
  );
  const [{ isItPicked }, dragRef, preview] = useDrag({
    type: DraggableTypes.ingredient,
    options: {
      dropEffect: 'copy',
    },
    item: {
      refId: _id,
      type,
    } as IngredientDragItem,
    collect(monitoring) {
      return {
        isItPicked: monitoring.isDragging(),
      };
    },
  });

  return (
    <li
      ref={dragRef}
      className={cs(style['burger-ingredient'], {
        [style['burger-ingredient_interactive']]: onClick,
        [style['burger-ingredient_is-picked']]: isItPicked,
      })}
      onClick={onClick}
    >
      <DragPreviewImage connect={preview} src={image} />
      {idToActualIngredientsCountMap[_id] && (
        <Counter count={idToActualIngredientsCountMap[_id]} />
      )}
      <div>
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
      </div>
    </li>
  );
};

BurgerIngredient.propTypes = {
  ingredient: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default BurgerIngredient;
