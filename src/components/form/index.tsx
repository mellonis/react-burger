import cs from 'classnames';
import React, { ReactNode, useMemo } from 'react';
import { AdditionalAction } from '../../types';
import { produceAdditionalActionReactNode } from './helpers';
import fromStyles from './style.module.css';

const Form = ({
  additionalActions,
  children,
  button,
  title,
}: {
  additionalActions: AdditionalAction[];
  children: ReactNode;
  button?: ReactNode;
  title?: string;
}) => {
  const additionalActionReactNodes = useMemo(() => {
    if (!additionalActions) {
      return null;
    }

    return additionalActions.map(produceAdditionalActionReactNode);
  }, [additionalActions]);

  return (
    <form className={fromStyles['form']}>
      {title ? (
        <>
          <div
            className={fromStyles['form__header']}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div className={'pt-6'} />
        </>
      ) : null}
      <div className={fromStyles['form__body']}>{children}</div>
      {button ? (
        <>
          <div className={'pt-6'} />
          <div className={fromStyles['form__button-wrapper']}>{button}</div>
        </>
      ) : null}
      {additionalActionReactNodes ? (
        <>
          <div className={'pt-20'} />
          <div
            className={cs(
              fromStyles['form__additional-actions'],
              'text_color_inactive'
            )}
          >
            {additionalActionReactNodes}
          </div>
        </>
      ) : null}
    </form>
  );
};

export { Form };
