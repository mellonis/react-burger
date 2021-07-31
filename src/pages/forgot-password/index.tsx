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
        onSubmit={(formData) => console.log(formData)}
        title={lexemes.forms.forgotPassword.title}
      />
    </div>
  );
};

export { ForgotPasswordPage };
