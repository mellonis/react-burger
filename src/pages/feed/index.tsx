import React from 'react';
import cs from 'classnames';
import { pageClassname } from '../consts';

const feedPageClassname = 'feed-page';

const FeedPage = () => (
  <div
    className={cs(
      pageClassname,
      `${pageClassname}_${feedPageClassname}`,
      feedPageClassname
    )}
  >
    Feed Page
  </div>
);

export { FeedPage };
