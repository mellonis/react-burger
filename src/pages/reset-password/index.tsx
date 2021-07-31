import React from 'react';
import cs from 'classnames';

import pageStyles from '../page-style.module.css';
import fromStyles from '../form-style.module.css';

const resetPasswordPageClassname = 'reset-password-page';

const ResetPasswordPage = () => (
  <div
    className={cs(
      pageStyles['page'],
      pageStyles[`page_${resetPasswordPageClassname}`], // for BEM methodology accomplishments
      resetPasswordPageClassname
    )}
  >
    <form className={cs(fromStyles['form'])}>Reset Password Page</form>
  </div>
);

export { ResetPasswordPage };
