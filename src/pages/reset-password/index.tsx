import React from 'react';
import cs from 'classnames';

import { AdditionalAction } from '../../types';
import { lexemes } from '../../consts';
import {
  ComponentInputType,
  Form,
  InputDeclaration,
} from '../../components/form';

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
        onSubmit={(formData) => console.log(formData)}
        title={lexemes.forms.resetPassword.title}
      />
    </div>
  );
};

export { ResetPasswordPage };
