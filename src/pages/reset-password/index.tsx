import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import cs from 'classnames';
import { lexemes } from '../../consts';

import { Form } from '../../components/form';

import pageStyles from '../page-style.module.css';

const resetPasswordPageClassname = 'reset-password-page';

const ResetPasswordPage = () => (
  <div
    className={cs(
      pageStyles['page'],
      pageStyles[`page_${resetPasswordPageClassname}`], // for BEM methodology accomplishments
      resetPasswordPageClassname
    )}
  >
    <Form
      button={
        <Button type={'primary'}>{lexemes.forms.resetPassword.doReset}</Button>
      }
      title={lexemes.forms.resetPassword.title}
    >
      Reset Password Page
    </Form>
  </div>
);

export { ResetPasswordPage };
