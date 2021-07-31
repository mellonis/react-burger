import React, { useMemo } from 'react';
import cs from 'classnames';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { lexemes } from '../../consts';

import { Form, produceAdditionalActionReactNode } from '../../components/form';

import pageStyles from '../page-style.module.css';

const forgotPasswordPageClassname = 'forgot-password-page';

const ForgotPasswordPage = () => {
  const additionalActions = useMemo(
    () =>
      [
        {
          title: lexemes.forms.__common__.haveYouRememberedYourPassword,
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
        pageStyles[`page_${forgotPasswordPageClassname}`], // for BEM methodology accomplishments
        forgotPasswordPageClassname
      )}
    >
      <Form
        additionalActions={additionalActions}
        button={
          <Button type={'primary'}>
            {lexemes.forms.forgotPassword.doResetPassword}
          </Button>
        }
        title={lexemes.forms.forgotPassword.title}
      >
        Forgot Password Page
      </Form>
    </div>
  );
};

export { ForgotPasswordPage };
