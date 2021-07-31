import { AdditionalAction } from '../../types';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export const produceAdditionalActionReactNode: (
  value: AdditionalAction,
  index: number,
  array: AdditionalAction[]
) => ReactNode = ({ title, url, urlTitle }: AdditionalAction, index) => (
  <React.Fragment key={index}>
    {index > 0 ? <div className={'pt-4'} /> : null}
    <div>
      <span
        dangerouslySetInnerHTML={{
          __html: title,
        }}
      />
      &nbsp;
      <Link
        to={url}
        dangerouslySetInnerHTML={{
          __html: urlTitle,
        }}
      />
    </div>
  </React.Fragment>
);
