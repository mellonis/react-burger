import React, { MutableRefObject, useCallback, useMemo, useRef } from 'react';
import cs from 'classnames';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AdditionalAction } from '../../types';
import {
  ComponentInputType,
  InputDeclaration,
  produceAdditionalActionReactNode,
  produceInputReactNode,
} from './helpers';

import fromStyles from './style.module.css';

const Form = ({
  additionalActions,
  buttonTitle,
  inputDeclarations,
  onSubmit,
  title,
}: {
  additionalActions: AdditionalAction[];
  buttonTitle?: string;
  inputDeclarations: InputDeclaration[];
  onSubmit: SubmitHandler<any>;
  title?: string;
}) => {
  const componentElementRef: MutableRefObject<HTMLFormElement | null> =
    useRef(null);
  const schema = useMemo(() => {
    return yup.object().shape(
      inputDeclarations.reduce(
        (result, inputDeclaration) =>
          Object.assign(result, {
            [inputDeclaration.name]:
              inputDeclaration.componentType === ComponentInputType.input
                ? yup.string().required()
                : yup.string().min(6), // INFO: (mellonis) empirical knowledge for a password value requirements
          }),
        {}
      )
    );
  }, [inputDeclarations]);
  const { control, handleSubmit } = useForm({
    defaultValues: inputDeclarations.reduce(
      (result, { name }) => Object.assign(result, { [name]: '' }),
      {}
    ),
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });
  const onInvalidFormHandler = useCallback((errors) => {
    console.error(errors);
  }, []);
  const onValidFormHandler = useCallback(
    (...args) => {
      const { current: componentElement } = componentElementRef;

      if (!componentElement) {
        return;
      }

      onSubmit.apply(null, args as any);
    },
    [onSubmit]
  );
  const onButtonClickHandler = useCallback(() => {
    const { current: formElement } = componentElementRef;

    if (formElement) {
      formElement.dispatchEvent(new Event('submit'));
    }
  }, []);

  return (
    <form
      ref={componentElementRef}
      className={fromStyles['form']}
      onSubmit={handleSubmit(onValidFormHandler, onInvalidFormHandler)}
    >
      {title ? (
        <>
          <div
            className={fromStyles['form__header']}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div className={'pt-6'} />
        </>
      ) : null}
      <div className={fromStyles['form__body']}>
        {inputDeclarations.map(produceInputReactNode, control)}
      </div>
      {buttonTitle ? (
        <>
          <div className={'pt-6'} />
          <div className={fromStyles['form__button-wrapper']}>
            <Button type={'primary'} onClick={onButtonClickHandler}>
              {buttonTitle}
            </Button>
          </div>
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
            {additionalActions.map(produceAdditionalActionReactNode)}
          </div>
        </>
      ) : null}
    </form>
  );
};

export { ComponentInputType } from './helpers';
export { Form };
export type { InputDeclaration };
