import React from 'react';
import cs from 'classnames';
import { lexemes } from '../../consts';

import { Form } from '../../components/form';

import pageStyles from '../page-style.module.css';

const forgotPasswordPageClassname = 'forgot-password-page';

const ForgotPasswordPage = () => (
  <div
    className={cs(
      pageStyles['page'],
      pageStyles[`page_${forgotPasswordPageClassname}`], // for BEM methodology accomplishments
      forgotPasswordPageClassname
    )}
  >
    <Form title={lexemes.forms.forgotPassword.title}>Forgot Password Page</Form>
  </div>
);

export { ForgotPasswordPage };
