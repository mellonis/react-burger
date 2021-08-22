import cs from 'classnames';
import React, { FC, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import {
  ComponentInputType,
  Form,
  InputDeclaration,
} from '../../components/form';
import { lexemes } from '../../consts';
import {
  interruptUserLogin,
  login,
  UserLoginPhase,
} from '../../services/reducers';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { AdditionalAction } from '../../types';

import pageStyles from '../page-style.module.css';

const loginPageClassname = 'login-page';

const additionalActions: AdditionalAction[] = [
  {
    title: lexemes.forms.login.areYouTheNewUser,
    url: '/register',
    urlTitle: lexemes.forms.__common__.doRegister,
  },
  {
    title: lexemes.forms.login.areYouForgetYourPassword,
    url: '/forgot-password',
    urlTitle: lexemes.forms.login.doResetYourPassword,
  },
];
const inputDeclarations: InputDeclaration[] = [
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

const LoginPage: FC = () => {
  const { userLoginPhase } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { state: { redirectedFrom = '/' } = {} } = useLocation() as {
    state: { redirectedFrom?: string };
  };

  useEffect(() => {
    return () => {
      if ([UserLoginPhase.rejected].includes(userLoginPhase)) {
        dispatch(interruptUserLogin());
      }
    };
  }, [dispatch, userLoginPhase]);

  if ([UserLoginPhase.fulfilled].includes(userLoginPhase)) {
    return <Redirect to={redirectedFrom} />;
  }

  return (
    <div
      className={cs(
        pageStyles['page'],
        pageStyles[`page_${loginPageClassname}`], // for BEM methodology accomplishments
        loginPageClassname
      )}
    >
      <Form
        additionalActions={additionalActions}
        inputDeclarations={inputDeclarations}
        buttonTitle={lexemes.forms.__common__.doLogin}
        onSubmit={({ email, password }) => {
          if (
            [UserLoginPhase.initial, UserLoginPhase.rejected].includes(
              userLoginPhase
            )
          ) {
            dispatch(login({ email, password }));
          }
        }}
        title={lexemes.forms.login.title}
      />
    </div>
  );
};

export { LoginPage };
