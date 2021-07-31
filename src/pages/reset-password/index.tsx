import React from 'react';
import cs from 'classnames';

import pageStyles from '../page-style.module.css';

const resetPasswordPageClassname = 'reset-password-page';

const ResetPasswordPage = () => (
  <div
    className={cs(
      pageStyles['page'],
      pageStyles[`page_${resetPasswordPageClassname}`], // for BEM methodology accomplishments
      resetPasswordPageClassname
    )}
  >
    Reset Password Page
  </div>
);

export { ResetPasswordPage };
