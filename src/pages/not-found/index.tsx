import cs from 'classnames';
import React, { FC } from 'react';

import pageStyles from '../page-style.module.css';

const notFoundPageClassname = 'not-found-page';

const NotFoundPage: FC = () => (
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
