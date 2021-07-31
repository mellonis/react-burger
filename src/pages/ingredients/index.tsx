import React from 'react';
import cs from 'classnames';

import pageStyles from '../page-style.module.css';

const ingredientsPageClassname = 'ingredients-page';

const IngredientsPage = () => (
  <div
    className={cs(
      pageStyles['page'],
      pageStyles[`page_${ingredientsPageClassname}`], // for BEM methodology accomplishments
      ingredientsPageClassname
    )}
  >
    Ingredients Page
  </div>
);

export { IngredientsPage };
