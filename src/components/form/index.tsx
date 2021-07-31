import cs from 'classnames';
import React, { ReactNode, ReactNodeArray } from 'react';
import fromStyles from './style.module.css';

const Form = ({
  additionalActions,
  children,
  button,
  title,
}: {
  additionalActions?: ReactNodeArray;
  children: ReactNode;
  button?: ReactNode;
  title?: string;
}) => {
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
      {additionalActions ? (
        <>
          <div className={'pt-20'} />
          <div
            className={cs(
              fromStyles['form__additional-actions'],
              'text_color_inactive'
            )}
          >
            {additionalActions}
          </div>
        </>
      ) : null}
    </form>
  );
};

export { Form };
