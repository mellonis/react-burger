import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
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
    <Form
      button={
        <Button type={'primary'}>{lexemes.forms.__common__.doLogin}</Button>
      }
      title={lexemes.forms.login.title}
    >
      Login Page
    </Form>
  </div>
);

export { LoginPage };
