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
    <Form title={lexemes.forms.register.title}>Register Page</Form>
  </div>
);

export { RegisterPage };
