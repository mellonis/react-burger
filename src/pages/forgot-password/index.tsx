import React from 'react';
import cs from 'classnames';

import pageStyles from '../page-style.module.css';
import fromStyles from '../form-style.module.css';

const forgotPasswordPageClassname = 'forgot-password-page';

const ForgotPasswordPage = () => (
  <div
    className={cs(
      pageStyles['page'],
      pageStyles[`page_${forgotPasswordPageClassname}`], // for BEM methodology accomplishments
      forgotPasswordPageClassname
    )}
  >
    <form className={cs(fromStyles['form'])}>Forgot Password Page</form>
  </div>
);

export { ForgotPasswordPage };
