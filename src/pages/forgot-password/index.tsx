import React from 'react';
import cs from 'classnames';

import pageStyles from '../page-style.module.css';

const forgotPasswordPageClassname = 'forgot-password-page';

const ForgotPasswordPage = () => (
  <div
    className={cs(
      pageStyles['page'],
      pageStyles[`page_${forgotPasswordPageClassname}`], // for BEM methodology accomplishments
      forgotPasswordPageClassname
    )}
  >
    Forgot Password Page
  </div>
);

export { ForgotPasswordPage };
