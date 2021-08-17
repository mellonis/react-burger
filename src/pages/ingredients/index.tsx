import React, { FC } from 'react';
import cs from 'classnames';
import { Redirect, useRouteMatch } from 'react-router-dom';
import { IngredientDetails } from '../../components/ingredient-details';
import { useAppSelector } from '../../services/store';

import pageStyles from '../page-style.module.css';

const ingredientsPageClassname = 'ingredients-page';

const IngredientsPage: FC = () => {
  const {
    params: { id },
  } = useRouteMatch() as { params: { id: string } };
  const { idToIngredientMap, ingredientsRequest } = useAppSelector(
    (state) => state.burger
  );

  if (ingredientsRequest) {
    return null;
  }

  const { [id]: ingredient } = idToIngredientMap;

  if (!ingredient) {
    return <Redirect to={'/'} />;
  }

  return (
    <div
      className={cs(
        pageStyles['page'],
        pageStyles[`page_${ingredientsPageClassname}`], // for BEM methodology accomplishments
        ingredientsPageClassname
      )}
    >
      <IngredientDetails />
    </div>
  );
};

export { IngredientsPage };
