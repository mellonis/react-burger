import React from 'react';
import cs from 'classnames';
import { lexemes } from '../../consts';

import { Form } from '../../components/form';

import pageStyles from '../page-style.module.css';

const loginPageClassname = 'login-page';

const LoginPage = () => (
  <div
    className={cs(
      pageStyles['page'],
      pageStyles[`page_${loginPageClassname}`], // for BEM methodology accomplishments
      loginPageClassname
    )}
  >
    <Form title={lexemes.forms.login.title}>Login Page</Form>
  </div>
);

export { LoginPage };
