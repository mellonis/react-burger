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

const LoginPage = () => {
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
        onSubmit={(formData) => console.log(formData)}
        title={lexemes.forms.login.title}
      />
    </div>
  );
};

export { LoginPage };
