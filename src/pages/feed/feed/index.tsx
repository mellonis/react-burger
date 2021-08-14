import cs from 'classnames';
import React from 'react';
import { Feed as FeedComponent } from '../../../components/feed/intex';
import { lexemes } from '../../../consts';
import feedPageStyles from './style.module.css';

const feedPageClassname = 'feed-page';

const FeedPage = () => {
  return (
    <div className={feedPageStyles[feedPageClassname]}>
      <div
        className={cs(
          feedPageStyles[`${feedPageClassname}__feed-wrapper`],
          'pt-10 pb-5 '
        )}
      >
        <div
          className={cs(
            feedPageStyles[`${feedPageClassname}__title`],
            'text text_type_main-large'
          )}
        >
          {lexemes.orderList}
        </div>
        <FeedComponent
          className={feedPageStyles[`${feedPageClassname}__feed`]}
          orders={[]}
        />
      </div>
      <div
        className={cs(feedPageStyles[`${feedPageClassname}__space`], 'pl-15')}
      />
      <div
        className={cs(
          feedPageStyles[`${feedPageClassname}__activity`],
          'pt-25 pb-5 text'
        )}
      >
        Activity
      </div>
    </div>
  );
};

export { FeedPage };
