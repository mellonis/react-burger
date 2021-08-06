import cs from 'classnames';
import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  ComponentInputType,
  Form,
  InputDeclaration,
} from '../../components/form';
import { lexemes } from '../../consts';
import {
  PasswordResettingPhase,
  requestPasswordResettingForEmail,
  UserLoginPhase,
} from '../../services/reducers';
import { useAppDispatch, useAppSelector } from '../../services/store';

import { AdditionalAction } from '../../types';

import pageStyles from '../page-style.module.css';

const forgotPasswordPageClassname = 'forgot-password-page';

const additionalActions: AdditionalAction[] = [
  {
    title: lexemes.forms.__common__.haveYouRememberedYourPassword,
    url: '/login',
    urlTitle: lexemes.forms.__common__.doLogin,
  },
];
const inputDeclarations: InputDeclaration[] = [
  {
    componentType: ComponentInputType.input,
    name: 'email',
    placeholder: lexemes.forms.forgotPassword.provideYourEmail,
    type: 'email',
  },
];

const ForgotPasswordPage = () => {
  const { userLoginPhase, passwordResettingPhase } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();

  if ([UserLoginPhase.fulfilled].includes(userLoginPhase)) {
    return <Redirect to={'/'} />;
  }

  if (
    [
      PasswordResettingPhase.requestingCredentialsFromUser,
      PasswordResettingPhase.pendingResetting,
      PasswordResettingPhase.fulfilled,
    ].includes(passwordResettingPhase)
  ) {
    return <Redirect to={'/reset-password'} />;
  }

  return (
    <div
      className={cs(
        pageStyles['page'],
        pageStyles[`page_${forgotPasswordPageClassname}`], // for BEM methodology accomplishments
        forgotPasswordPageClassname
      )}
    >
      <Form
        additionalActions={additionalActions}
        buttonTitle={lexemes.forms.forgotPassword.doResetPassword}
        inputDeclarations={inputDeclarations}
        onSubmit={({ email }) => {
          if (passwordResettingPhase === PasswordResettingPhase.initial) {
            dispatch(requestPasswordResettingForEmail({ email }));
          }
        }}
        title={lexemes.forms.forgotPassword.title}
      />
    </div>
  );
};

export { ForgotPasswordPage };
