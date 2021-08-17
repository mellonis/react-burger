import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import cs from 'classnames';
import React, {
  FC,
  MutableRefObject,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { lexemes } from '../../consts';
import { AdditionalAction } from '../../types';
import {
  ComponentInputType,
  InputDeclaration,
  produceAdditionalActionReactNode,
  produceInputReactNode,
} from './helpers';
import fromStyles from './style.module.css';

const Form: FC<{
  additionalActions?: AdditionalAction[];
  buttonTitle?: string;
  inputDeclarations: InputDeclaration[];
  isButtonHiddenOnNotModifiedForm?: boolean;
  onSubmit: SubmitHandler<any>;
  resetButtonTitle?: string;
  showErrors?: boolean;
  title?: string;
}> = ({
  additionalActions,
  buttonTitle,
  inputDeclarations,
  isButtonHiddenOnNotModifiedForm,
  onSubmit,
  resetButtonTitle,
  showErrors,
  title,
}) => {
  const componentElementRef: MutableRefObject<HTMLFormElement | null> =
    useRef(null);
  const schema = useMemo(() => {
    return yup.object().shape(
      inputDeclarations.reduce(
        (result, inputDeclaration) =>
          Object.assign(result, {
            [inputDeclaration.name]: (() => {
              const isItPasswordField =
                inputDeclaration.componentType ===
                  ComponentInputType.passwordInput ||
                inputDeclaration.name === 'password';

              return isItPasswordField
                ? yup
                    .string()
                    .min(
                      6,
                      `${lexemes.forms.__common__.__errors__.passwordLength} (${
                        inputDeclaration.placeholder ?? inputDeclaration.name
                      })`
                    ) // INFO: (mellonis) empirical knowledge for a password value requirements
                : yup
                    .string()
                    .required(
                      `${lexemes.forms.__common__.__errors__.required} (${inputDeclaration.placeholder})`
                    );
            })(),
          }),
        {}
      )
    );
  }, [inputDeclarations]);
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: inputDeclarations.reduce(
      (result, { name, initialValue }) =>
        Object.assign(result, { [name]: initialValue ?? '' }),
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

  const isButtonVisible =
    buttonTitle &&
    (!isButtonHiddenOnNotModifiedForm ||
      (isButtonHiddenOnNotModifiedForm && isDirty));
  const isResetButtonVisible = resetButtonTitle && isDirty;

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
      {isDirty && showErrors && Object.keys(errors).length > 0 ? (
        <>
          <div className={'pt-6'} />
          <ul className={cs(fromStyles['form__errors'], 'text_color_error')}>
            {Object.entries(errors)
              .sort(([fieldNameA], [fieldNameB]) =>
                fieldNameA.localeCompare(fieldNameB)
              )
              .map(([fieldName, error]) => {
                return (
                  <li key={fieldName} className={fromStyles['form__error']}>
                    {(error as { message?: string })?.message ?? 'unknown'}
                  </li>
                );
              })}
          </ul>
        </>
      ) : null}
      {isButtonVisible || isResetButtonVisible ? (
        <>
          <div className={'pt-6'} />
          <div className={fromStyles['form__buttons-container']}>
            {isButtonVisible ? (
              <div className={fromStyles['form__button-wrapper']}>
                <Button type={'primary'} onClick={onButtonClickHandler}>
                  {buttonTitle}
                </Button>
              </div>
            ) : null}
            {isButtonVisible && isResetButtonVisible ? (
              <div className={'pl-6'} />
            ) : null}
            {isResetButtonVisible ? (
              <div className={fromStyles['form__button-wrapper']}>
                <Button type={'primary'} onClick={() => reset()}>
                  {resetButtonTitle}
                </Button>
              </div>
            ) : null}
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

Form.defaultProps = {
  isButtonHiddenOnNotModifiedForm: false,
  showErrors: false,
};

export { ComponentInputType } from './helpers';
export { Form };
export type { InputDeclaration };
