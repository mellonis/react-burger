import React from 'react';
import cs from 'classnames';
import { pageClassname } from '../consts';

const resetPasswordPageClassname = 'reset-password-page';

const ResetPasswordPage = () => (
  <div
    className={cs(
      pageClassname,
      `${pageClassname}_${resetPasswordPageClassname}`,
      resetPasswordPageClassname
    )}
  >
    Reset Password Page
  </div>
);

export { ResetPasswordPage };
