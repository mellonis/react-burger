import React, { ReactNode } from 'react';
import fromStyles from './style.module.css';

const Form = ({
  additionalActions,
  children,
  button,
  title,
}: {
  additionalActions?: ReactNode;
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
          <div className={fromStyles['form__button-wrapper']} />
        </>
      ) : null}
      {additionalActions ? (
        <>
          <div className={'pt-20'} />
          <div className={fromStyles['form__additionalActions']} />
        </>
      ) : null}
    </form>
  );
};

export { Form };
