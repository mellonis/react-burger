import React from 'react';
import cs from 'classnames';

import pageStyles from '../page-style.module.css';

const notFoundPageClassname = 'not-found-page';

const NotFoundPage = () => (
  <div
    className={cs(
      pageStyles['page'],
      pageStyles[`page_${notFoundPageClassname}`], // for BEM methodology accomplishments
      notFoundPageClassname
    )}
  >
    Not Found Page
  </div>
);

export { NotFoundPage };
