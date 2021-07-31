import React, { useMemo } from 'react';
import cs from 'classnames';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { lexemes } from '../../consts';

import { Form, produceAdditionalActionReactNode } from '../../components/form';

import pageStyles from '../page-style.module.css';

const registerPageClassname = 'register-page';

const RegisterPage = () => {
  const additionalActions = useMemo(
    () =>
      [
        {
          title: lexemes.forms.register.areYouRegisteredAlready,
          url: '/login',
          urlTitle: lexemes.forms.__common__.doLogin,
        },
      ].map(produceAdditionalActionReactNode),
    []
  );

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
        button={
          <Button type={'primary'}>
            {lexemes.forms.__common__.doRegister}
          </Button>
        }
        title={lexemes.forms.register.title}
      >
        Register Page
      </Form>
    </div>
  );
};

export { RegisterPage };
