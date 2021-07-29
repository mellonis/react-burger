import React from 'react';
import cs from 'classnames';
import { pageClassname } from '../consts';

const forgotPasswordPageClassname = 'forgot-password-page';

const ForgotPasswordPage = () => (
  <div
    className={cs(
      pageClassname,
      `${pageClassname}_${forgotPasswordPageClassname}`,
      forgotPasswordPageClassname
    )}
  >
    Forgot Password Page
  </div>
);

export { ForgotPasswordPage };
