import cs from 'classnames';
import React, { FC, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import {
  ComponentInputType,
  Form,
  InputDeclaration,
} from '../../components/form';
import { lexemes } from '../../consts';
import {
  interruptUserRegistration,
  registerUser,
  UserLoginPhase,
  UserRegistrationPhase,
} from '../../services/reducers';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { AdditionalAction } from '../../types';
import pageStyles from '../page-style.module.css';

const registerPageClassname = 'register-page';

const additionalActions: AdditionalAction[] = [
  {
    title: lexemes.forms.register.areYouRegisteredAlready,
    url: '/login',
    urlTitle: lexemes.forms.__common__.doLogin,
  },
];
const inputDeclarations: InputDeclaration[] = [
  {
    componentType: ComponentInputType.input,
    name: 'name',
    placeholder: lexemes.forms.__common__.name,
  },
  {
    componentType: ComponentInputType.input,
    name: 'email',
    placeholder: lexemes.forms.__common__.email,
    type: 'email',
  },
  {
    componentType: ComponentInputType.passwordInput,
    name: 'password',
  },
];

const RegisterPage: FC = () => {
  const { userLoginPhase, userRegistrationPhase } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(interruptUserRegistration());
    };
  }, [dispatch]);

  if ([UserLoginPhase.fulfilled].includes(userLoginPhase)) {
    return <Redirect to={'/login'} />;
  }

  if (
    [UserRegistrationPhase.fulfilled, UserRegistrationPhase.rejected].includes(
      userRegistrationPhase
    )
  ) {
    return <Redirect to={'/login'} />;
  }

  return (
    <div
      className={cs(
        pageStyles['page'],
        pageStyles[`page_${registerPageClassname}`], // for BEM methodology accomplishments
        registerPageClassname
      )}
    >
      <Form
        additionalActions={additionalActions}
        inputDeclarations={inputDeclarations}
        buttonTitle={lexemes.forms.__common__.doRegister}
        onSubmit={({ email, name, password }) => {
          if (userRegistrationPhase === UserRegistrationPhase.initial) {
            dispatch(
              registerUser({
                email,
                name,
                password,
              })
            );
          }
        }}
        showErrors={true}
        title={lexemes.forms.register.title}
      />
    </div>
  );
};

export { RegisterPage };
