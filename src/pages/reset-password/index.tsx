import cs from 'classnames';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import {
  ComponentInputType,
  Form,
  InputDeclaration,
} from '../../components/form';
import { lexemes } from '../../consts';
import {
  interruptPasswordResettingWorkflow,
  PasswordResettingPhase,
  requestNewPasswordSetting,
  UserLoginPhase,
} from '../../services/reducers';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { AdditionalAction } from '../../types';

import pageStyles from '../page-style.module.css';

const resetPasswordPageClassname = 'reset-password-page';

const additionalActions: AdditionalAction[] = [
  {
    title: lexemes.forms.__common__.haveYouRememberedYourPassword,
    url: '/login',
    urlTitle: lexemes.forms.__common__.doLogin,
  },
];
const inputDeclarations: InputDeclaration[] = [
  {
    componentType: ComponentInputType.passwordInput,
    name: 'newPassword',
  },
  {
    componentType: ComponentInputType.input,
    name: 'approvalCode',
    type: 'text',
    placeholder: lexemes.forms.resetPassword.provideApprovalCode,
  },
];

const ResetPasswordPage = () => {
  const { userLoginPhase, passwordResettingPhase } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(interruptPasswordResettingWorkflow());
    };
  }, [dispatch]);

  if ([UserLoginPhase.fulfilled].includes(userLoginPhase)) {
    return <Redirect to={'/'} />;
  }

  if (
    [
      PasswordResettingPhase.fulfilled,
      PasswordResettingPhase.initial,
      PasswordResettingPhase.rejected,
    ].includes(passwordResettingPhase)
  ) {
    return <Redirect to={'/login'} />;
  }

  return (
    <div
      className={cs(
        pageStyles['page'],
        pageStyles[`page_${resetPasswordPageClassname}`], // for BEM methodology accomplishments
        resetPasswordPageClassname
      )}
    >
      <Form
        additionalActions={additionalActions}
        inputDeclarations={inputDeclarations}
        buttonTitle={lexemes.forms.resetPassword.doReset}
        onSubmit={({ newPassword: password, approvalCode: token }) => {
          if (
            passwordResettingPhase ===
            PasswordResettingPhase.requestingCredentialsFromUser
          ) {
            dispatch(requestNewPasswordSetting({ password, token }));
          }
        }}
        title={lexemes.forms.resetPassword.title}
      />
    </div>
  );
};

export { ResetPasswordPage };
