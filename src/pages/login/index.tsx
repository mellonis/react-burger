import React from 'react';
import cs from 'classnames';

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
    Login Page
  </div>
);

export { LoginPage };
