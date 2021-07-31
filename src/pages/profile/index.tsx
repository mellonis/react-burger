import React from 'react';
import cs from 'classnames';

import pageStyles from '../page-style.module.css';

const profilePageClassname = 'profile-page';

const ProfilePage = () => (
  <div
    className={cs(
      pageStyles['page'],
      pageStyles[`page_${profilePageClassname}`], // for BEM methodology accomplishments
      profilePageClassname
    )}
  >
    Profile Page
  </div>
);

export { ProfilePage };
