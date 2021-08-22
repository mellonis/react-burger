import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import cs from 'classnames';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { lexemes } from '../../consts';
import { useAppSelector } from '../../services/store';
import { IngredientType } from '../../types';
import { BurgerIngredientType } from './burger-ingredient-type';
import style from './style.module.css';

const ingredientTypeTitles = {
  bun: lexemes.buns,
  sauce: lexemes.sauces,
  main: lexemes.burgerFillings,
};
const ingredientTypes = Object.keys(ingredientTypeTitles) as Array<
  keyof typeof ingredientTypeTitles
>;

const thresholdsStepsCount = 50;
const thresholds = [
  ...Array.from({ length: thresholdsStepsCount - 1 }).map(
    (_, ix) => ix / (thresholdsStepsCount - 1)
  ),
  1,
];

const BurgerIngredients: FC<{ className?: string }> = ({ className }) => {
  const { ingredients } = useAppSelector((state) => state.burger);
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
    ) as NodeListOf<HTMLLIElement>;

    if (items.length > 0) {
      const ingredientToIntersectionRatioMap = new Map();

      const intersectionObserver = new IntersectionObserver(
        (intersectionObserverEntries) => {
          intersectionObserverEntries.forEach(
            ({ target, intersectionRatio }) => {
              const {
                dataset: { type },
              } = target as HTMLLIElement;

              if (type) {
                ingredientToIntersectionRatioMap.set(type, intersectionRatio);
              }
            }
          );

          const mostVisibleType = [
            // @ts-ignore
            ...ingredientToIntersectionRatioMap.entries(),
          ].sort(([, irA], [, irB]) => irB - irA)[0][0];

          setSelectedIngredientType(mostVisibleType);
        },
        {
          root: typeListElement,
          threshold: thresholds,
        }
      );

      items.forEach((item) => {
        ingredientToIntersectionRatioMap.set(item.dataset.type, 0);
        intersectionObserver.observe(item);
      });

      return () => {
        intersectionObserver.disconnect();
        ingredientToIntersectionRatioMap.clear();
      };
    }
  }, []);

  return (
    <div
      className={cs(style['burger-ingredients'], 'pb-5', className)}
      data-test-id="burger-ingredients"
    >
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
            }}
          >
            {(ingredientTypeTitles as any)[type]}
          </Tab>
        ))}
      </div>
      <ul
        ref={typeListElementRef}
        className={cs(style['burger-ingredients__type-list'], 'custom-scroll')}
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

export { BurgerIngredients };
