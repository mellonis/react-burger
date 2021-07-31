import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import cs from 'classnames';
import { lexemes } from '../../consts';

import { Form } from '../../components/form';

import pageStyles from '../page-style.module.css';

const registerPageClassname = 'register-page';

const RegisterPage = () => (
  <div
    className={cs(
      pageStyles['page'],
      pageStyles[`page_${registerPageClassname}`], // for BEM methodology accomplishments
      registerPageClassname
    )}
  >
    <Form
      button={
        <Button type={'primary'}>{lexemes.forms.__common__.doRegister}</Button>
      }
      title={lexemes.forms.register.title}
    >
      Register Page
    </Form>
  </div>
);

export { RegisterPage };
