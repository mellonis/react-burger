import React from 'react';
import cs from 'classnames';

import pageStyles from '../page-style.module.css';
import fromStyles from '../form-style.module.css';

const loginPageClassname = 'login-page';

const LoginPage = () => (
  <div
    className={cs(
      pageStyles['page'],
      pageStyles[`page_${loginPageClassname}`], // for BEM methodology accomplishments
      loginPageClassname
    )}
  >
    <form className={cs(fromStyles['form'])}>Login Page</form>
  </div>
);

export { LoginPage };
