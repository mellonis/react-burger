import React from 'react';
import cs from 'classnames';

import pageStyles from '../page-style.module.css';
import fromStyles from '../form-style.module.css';

const registerPageClassname = 'register-page';

const RegisterPage = () => (
  <div
    className={cs(
      pageStyles['page'],
      pageStyles[`page_${registerPageClassname}`], // for BEM methodology accomplishments
      registerPageClassname
    )}
  >
    <form className={cs(fromStyles['form'])}>Register Page</form>
  </div>
);

export { RegisterPage };
