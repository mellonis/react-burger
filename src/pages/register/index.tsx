import React from 'react';
import cs from 'classnames';
import { pageClassname } from '../consts';

const registerPageClassname = 'register-page';

const RegisterPage = () => (
  <div
    className={cs(
      pageClassname,
      `${pageClassname}_${registerPageClassname}`,
      registerPageClassname
    )}
  >
    Register Page
  </div>
);

export { RegisterPage };
