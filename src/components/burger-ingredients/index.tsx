import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientType } from '../../types';
import { useAppSelector } from '../../services/store';
import { lexemes } from '../../consts';
import BurgerIngredientType from './burger-ingredient-type';

import style from './style.module.css';

const ingredientTypeTitles = {
  bun: lexemes.buns,
  sauce: lexemes.sauces,
  main: lexemes.burgerFillings,
};
const ingredientTypes = Object.keys(ingredientTypeTitles) as Array<
  keyof typeof ingredientTypeTitles
>;

const BurgerIngredients = ({ className }: { className?: string }) => {
  const { ingredients } = useAppSelector((state) => state.main);
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
  const typeListElementRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const { current: typeListElement } = typeListElementRef;
    const items = typeListElement!.querySelectorAll(
      `.${style['burger-ingredients__type-item']}`
    );

    if (items.length > 0) {
      const intersectionObserver = new IntersectionObserver(
        (intersectionObserverEntries) => {
          const target = intersectionObserverEntries.find(
            ({ isIntersecting }) => isIntersecting
          )?.target as HTMLLIElement | null;

          if (target) {
            setSelectedIngredientType(target.dataset.type as IngredientType);
          }
        },
        {
          root: typeListElement,
          rootMargin: '-50% 0px -50% 0px',
          threshold: 0,
        }
      );

      items.forEach((item) => {
        intersectionObserver.observe(item);
      });

      return () => {
        intersectionObserver.disconnect();
      };
    }
  }, []);

  return (
    <div className={cs(style['burger-ingredients'], 'pb-5', className)}>
      <div
        className={cs(
          style['burger-ingredients__title'],
          'pt-10 pb-5 text text_type_main-large'
        )}
      >
        {lexemes.assembleABurger}
      </div>
      <div className={cs(style['burger-ingredients__filter'])}>
        {ingredientTypes.map((type) => (
          <Tab
            key={type}
            active={selectedIngredientType === type}
            value={type}
            onClick={(type) => {
              const { current: typeListElement } = typeListElementRef;

              if (typeListElement) {
                const currentListItemElement = typeListElement.querySelector(
                  `.${style['burger-ingredients__type-item']}[data-type="${type}"]`
                );

                if (currentListItemElement) {
                  currentListItemElement.scrollIntoView({ behavior: 'smooth' });
                }
              }

              setSelectedIngredientType(type as IngredientType);
            }}
          >
            {(ingredientTypeTitles as any)[type]}
          </Tab>
        ))}
      </div>
      <ul
        ref={typeListElementRef}
        className={style['burger-ingredients__type-list']}
      >
        {Array.from(ingredientTypeToIngredientsMap.entries()).map(
          ([type, ingredients]) => (
            <BurgerIngredientType
              key={type}
              className={style['burger-ingredients__type-item']}
              ingredients={ingredients}
              title={ingredientTypeTitles[type as IngredientType]}
              type={type}
            />
          )
        )}
      </ul>
    </div>
  );
};

BurgerIngredients.propTypes = { className: PropTypes.string };

export default BurgerIngredients;
