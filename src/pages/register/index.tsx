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

const RegisterPage = () => {
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
        onSubmit={(formData) => console.log(formData)}
        title={lexemes.forms.register.title}
      />
    </div>
  );
};

export { RegisterPage };
