import React from 'react';
import cs from 'classnames';
import { pageClassname } from '../consts';

const loginPageClassname = 'login-page';

const LoginPage = () => (
  <div
    className={cs(
      pageClassname,
      `${pageClassname}_${loginPageClassname}`,
      loginPageClassname
    )}
  >
    Login Page
  </div>
);

export { LoginPage };
