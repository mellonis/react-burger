import React from 'react';
import cs from 'classnames';

import pageStyles from '../page-style.module.css';

const feedPageClassname = 'feed-page';

const FeedPage = () => (
  <div
    className={cs(
      pageStyles['page'],
      pageStyles[`page_${feedPageClassname}`], // for BEM methodology accomplishments
      feedPageClassname
    )}
  >
    Feed Page
  </div>
);

export { FeedPage };
