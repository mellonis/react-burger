import React, { useMemo } from 'react';
import cs from 'classnames';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { lexemes } from '../../consts';

import { Form, produceAdditionalActionReactNode } from '../../components/form';

import pageStyles from '../page-style.module.css';

const resetPasswordPageClassname = 'reset-password-page';

const ResetPasswordPage = () => {
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
        pageStyles[`page_${resetPasswordPageClassname}`], // for BEM methodology accomplishments
        resetPasswordPageClassname
      )}
    >
      <Form
        additionalActions={additionalActions}
        button={
          <Button type={'primary'}>
            {lexemes.forms.resetPassword.doReset}
          </Button>
        }
        title={lexemes.forms.resetPassword.title}
      >
        Reset Password Page
      </Form>
    </div>
  );
};

export { ResetPasswordPage };
