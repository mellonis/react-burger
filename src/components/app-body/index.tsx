import cs from 'classnames';
import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { lexemes } from '../../consts';
import {
  FeedPage,
  ForgotPasswordPage,
  IngredientsPage,
  LoginPage,
  LogoutPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from '../../pages';
import burgerConstructorStyles from '../burger-constructor/style.module.css';
import { IngredientDetails } from '../ingredient-details';
import { Modal } from '../modal';
import { ProtectedRoute } from '../protected-route';

import styles from './style.module.css';

const AppBody = () => {
  let location = useLocation();
  const { state: locationState } = useLocation() as {
    state: { backgroundPageLocation?: typeof location } | null;
  };
  const { backgroundPageLocation } = locationState ?? {};
  const history = useHistory();

  if (backgroundPageLocation) {
    location = backgroundPageLocation;
  }

  return (
    <main
      className={cs(
        styles['app-body'],
        'pl-5 pr-5 text text_type_main-default'
      )}
    >
      <Switch location={location}>
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
        <Route path="/ingredients/:id">
          <IngredientsPage />
        </Route>
        <Route path="/logout">
          <LogoutPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
      {backgroundPageLocation ? (
        <Route path="/ingredients/:id">
          <Modal
            onClose={() => history.goBack()}
            title={lexemes.ingredientDetails}
          >
            <IngredientDetails
              className={cs(
                burgerConstructorStyles[
                  'burger-constructor__ingredient-details'
                ]
              )}
            />
          </Modal>
        </Route>
      ) : null}
    </main>
  );
};

export { AppBody };
