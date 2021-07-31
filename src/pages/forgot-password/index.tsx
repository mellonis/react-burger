import React from 'react';
import cs from 'classnames';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { lexemes } from '../../consts';

import { Form } from '../../components/form';
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
