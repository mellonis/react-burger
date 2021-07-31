import React, { useMemo } from 'react';
import cs from 'classnames';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { lexemes } from '../../consts';

import { Form, produceAdditionalActionReactNode } from '../../components/form';

import pageStyles from '../page-style.module.css';

const loginPageClassname = 'login-page';

const LoginPage = () => {
  const additionalActions = useMemo(
    () =>
      [
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
      ].map(produceAdditionalActionReactNode),
    []
  );

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
        button={
          <Button type={'primary'}>{lexemes.forms.__common__.doLogin}</Button>
        }
        title={lexemes.forms.login.title}
      >
        Login Page
      </Form>
    </div>
  );
};

export { LoginPage };
