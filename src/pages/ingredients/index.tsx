import React from 'react';
import cs from 'classnames';
import { pageClassname } from '../consts';

const ingredientsPageClassname = 'ingredients-page';

const IngredientsPage = () => (
  <div
    className={cs(
      pageClassname,
      `${pageClassname}_${ingredientsPageClassname}`,
      ingredientsPageClassname
    )}
  >
    Ingredients Page
  </div>
);

export { IngredientsPage };
