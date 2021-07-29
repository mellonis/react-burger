import React from 'react';
import cs from 'classnames';
import { pageClassname } from '../consts';

const profilePageClassname = 'profile-page';

const ProfilePage = () => (
  <div
    className={cs(
      pageClassname,
      `${pageClassname}_${profilePageClassname}`,
      profilePageClassname
    )}
  >
    Profile Page
  </div>
);

export { ProfilePage };
