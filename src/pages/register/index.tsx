import React from 'react';
import cs from 'classnames';

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
    Register Page
  </div>
);

export { RegisterPage };
