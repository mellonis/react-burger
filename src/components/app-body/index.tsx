import cs from 'classnames';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { FeedPage } from '../../pages/feed';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import { IngredientsPage } from '../../pages/ingredients';
import { LoginPage } from '../../pages/login';
import { LogoutPage } from '../../pages/logout';
import { MainPage } from '../../pages/main';
import { NotFoundPage } from '../../pages/not-found';
import { ProfilePage } from '../../pages/profile';
import { RegisterPage } from '../../pages/register';
import { ResetPasswordPage } from '../../pages/reset-password';
import { ProtectedRoute } from '../protected-route';

import styles from './style.module.css';

const AppBody = () => (
  <main
    className={cs(styles['app-body'], 'pl-5 pr-5 text text_type_main-default')}
  >
    <Switch>
      <Route exact path="/">
        <MainPage />
      </Route>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/register">
        <RegisterPage />
      </Route>
      <Route exact path="/forgot-password">
        <ForgotPasswordPage />
      </Route>
      <Route exact path="/reset-password">
        <ResetPasswordPage />
      </Route>
      <Route path="/feed">
        <FeedPage />
      </Route>
      <ProtectedRoute path="/profile">
        <ProfilePage />
      </ProtectedRoute>
      <Route path="/ingredients">
        <IngredientsPage />
      </Route>
      <Route path="/logout">
        <LogoutPage />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  </main>
);

export { AppBody };
