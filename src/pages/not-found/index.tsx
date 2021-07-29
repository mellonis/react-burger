import React from 'react';
import cs from 'classnames';
import { pageClassname } from '../consts';

const notFoundPageClassname = 'not-found-page';

const NotFoundPage = () => (
  <div
    className={cs(
      pageClassname,
      `${pageClassname}_${notFoundPageClassname}`,
      notFoundPageClassname
    )}
  >
    Not Found Page
  </div>
);

export { NotFoundPage };
