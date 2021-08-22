import Cookies from 'universal-cookie';
import { AuthUserResponse } from '../../types';
import * as apiModule from '../api';
import {
  AutoLoginPhase,
  doAutoLogin,
  login,
  logout,
  PasswordResettingPhase,
  registerUser,
  updateUserData,
  UpdateUserDataPhase,
  UserLoginPhase,
  userReducer,
  UserRegistrationPhase,
} from './user';

jest.mock('../api', () => ({
  getUserData: jest.fn(),
  login: jest.fn(),
  logout: jest.fn(),
  refreshTokens: jest.fn(),
  registerUser: jest.fn(),
  updateUserData: jest.fn(),
}));

describe('user reducer', () => {
  const initialState = Object.freeze({
    autoLoginPhase: AutoLoginPhase.initial,
    passwordResettingPhase: PasswordResettingPhase.initial,
    userLoginPhase: UserLoginPhase.initial,
    userRegistrationPhase: UserRegistrationPhase.initial,
    updateUserDataPhase: UpdateUserDataPhase.initial,
  });

  afterAll(() => {
    jest.unmock('../api');
  });

  beforeEach(() => {
    (apiModule.getUserData as jest.Mock).mockClear();
    (apiModule.refreshTokens as jest.Mock).mockClear();
  });

  it('has initial state', () => {
    expect(userReducer(undefined, { type: 'some action' })).toEqual(
      initialState
    );
  });

  describe('autoLogin', () => {
    it("doesn't call getUserData if not authenticated", async () => {
      const action = doAutoLogin();
      const dispatch = jest.fn();
      const getState = jest.fn();

      await action(dispatch, getState, undefined);

      expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
        'user/doAutoLogin/pending',
        'user/doAutoLogin/rejected',
      ]);
      expect(apiModule.getUserData).toHaveBeenCalledTimes(0);
    });

    it('correctly call getUserData', async () => {
      const action = doAutoLogin();
      const dispatch = jest.fn();
      const getState = jest.fn();

      const currentAuthSchema = 'accessSchema';
      const currentAccessToken = 'accessToken';

      document.cookie = `accessSchema=${currentAuthSchema}`;
      document.cookie = `accessToken=${currentAccessToken}`;

      await action(dispatch, getState, undefined);

      expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
        'user/doAutoLogin/pending',
        'user/doAutoLogin/fulfilled',
      ]);
      expect(apiModule.getUserData).toHaveBeenCalledTimes(1);
      expect((apiModule.getUserData as jest.Mock).mock.calls[0][0]).toEqual({
        auth: {
          accessSchema: currentAuthSchema,
          accessToken: currentAccessToken,
        },
      });
    });

    it('correctly call getUserData, but rejects with error', async () => {
      const action = doAutoLogin();
      const dispatch = jest.fn();
      const getState = jest.fn();

      const currentAuthSchema = 'accessSchema';
      const currentAccessToken = 'accessToken';

      document.cookie = `accessSchema=${currentAuthSchema}`;
      document.cookie = `accessToken=${currentAccessToken}`;

      const errorMessage = 'some error';

      (apiModule.getUserData as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage)
      );

      await action(dispatch, getState, undefined);

      expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
        'user/doAutoLogin/pending',
        'user/doAutoLogin/rejected',
      ]);
      expect(apiModule.getUserData).toHaveBeenCalledTimes(1);
      expect(dispatch.mock.calls[1][0].error.message).toEqual(errorMessage);
    });

    it('updates state with getUserData result (pending)', () => {
      const state = userReducer(initialState, {
        type: 'user/doAutoLogin/pending',
      });

      expect(state.autoLoginPhase).toEqual(AutoLoginPhase.pending);
    });

    it('updates state with getUserData result (rejected)', () => {
      const state = userReducer(initialState, {
        type: 'user/doAutoLogin/rejected',
      });

      expect(state.autoLoginPhase).toEqual(AutoLoginPhase.rejected);
    });

    it('updates state with getUserData result (fulfilled)', () => {
      const user = Symbol('user');
      const state = userReducer(initialState, {
        type: 'user/doAutoLogin/fulfilled',
        payload: user,
      });

      expect(state.user).toEqual(user);
      expect(state.autoLoginPhase).toEqual(AutoLoginPhase.fulfilled);
    });

    it("doesn't call apiRefreshTokens if JWT token is expired, but there is no refresh token", async () => {
      const action = doAutoLogin();
      const dispatch = jest.fn();
      const getState = jest.fn();

      const currentAuthSchema = 'accessSchema';
      const currentAccessToken = 'accessToken';

      document.cookie = `accessSchema=${currentAuthSchema}`;
      document.cookie = `accessToken=${currentAccessToken}`;

      (apiModule.getUserData as jest.Mock).mockRejectedValueOnce(
        new Error('jwt expired')
      );

      await action(dispatch, getState, undefined);

      expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
        'user/doAutoLogin/pending',
        'user/doAutoLogin/rejected',
      ]);
      expect(apiModule.getUserData).toHaveBeenCalledTimes(1);
      expect(apiModule.refreshTokens).toHaveBeenCalledTimes(0);
      expect((apiModule.getUserData as jest.Mock).mock.calls[0][0]).toEqual({
        auth: {
          accessSchema: currentAuthSchema,
          accessToken: currentAccessToken,
        },
      });
    });

    it('correctly call apiRefreshTokens if JWT token is expired', async () => {
      const action = doAutoLogin();
      const dispatch = jest.fn();
      const getState = jest.fn();

      const currentAuthSchema = 'accessSchema';
      const currentAccessToken = 'accessToken';
      const currentRefreshToken = 'authRefreshToken';

      document.cookie = `accessSchema=${currentAuthSchema}`;
      document.cookie = `accessToken=${currentAccessToken}`;
      localStorage.setItem('authRefreshToken', currentRefreshToken);

      (apiModule.getUserData as jest.Mock).mockRejectedValueOnce(
        new Error('jwt expired')
      );

      const refreshedAuthSchema = 'accessSchemaRefreshed';
      const refreshedAccessToken = 'accessTokenRefreshed';
      const refreshedRefreshToken = 'authRefreshTokenRefreshed';

      (apiModule.refreshTokens as jest.Mock).mockResolvedValueOnce({
        accessSchema: refreshedAuthSchema,
        accessToken: refreshedAccessToken,
        refreshToken: refreshedRefreshToken,
      });

      await action(dispatch, getState, undefined);

      expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
        'user/doAutoLogin/pending',
        'user/doAutoLogin/fulfilled',
      ]);
      expect(apiModule.getUserData).toHaveBeenCalledTimes(2);
      expect(apiModule.refreshTokens).toHaveBeenCalledTimes(1);
      expect((apiModule.getUserData as jest.Mock).mock.calls[0][0]).toEqual({
        auth: {
          accessSchema: currentAuthSchema,
          accessToken: currentAccessToken,
        },
      });
      expect((apiModule.refreshTokens as jest.Mock).mock.calls[0][0]).toEqual({
        refreshToken: currentRefreshToken,
      });

      await expect(
        (apiModule.refreshTokens as jest.Mock).mock.results[0].value
      ).resolves.toEqual({
        accessSchema: refreshedAuthSchema,
        accessToken: refreshedAccessToken,
        refreshToken: refreshedRefreshToken,
      });

      expect(localStorage.getItem('authRefreshToken')).toEqual(
        refreshedRefreshToken
      );

      const cookieCtrl = new Cookies();

      expect(cookieCtrl.get('accessSchema')).toEqual('accessSchemaRefreshed');
      expect(cookieCtrl.get('accessToken')).toEqual('accessTokenRefreshed');
    });
  });

  describe('registerUser', () => {
    it('correctly call registerUser', async () => {
      const action = registerUser({
        email: 'test@test.ru',
        name: 'test:name',
        password: 'test:password',
      });
      const dispatch = jest.fn();
      const getState = jest.fn();

      const accessSchema = 'accessSchemaRegistered';
      const accessToken = 'accessTokenRegistered';
      const refreshToken = 'refreshTokenRegistered';
      const email = 'emailRegistered';
      const name = 'nameRegistered';

      (apiModule.registerUser as jest.Mock).mockResolvedValueOnce({
        accessSchema,
        accessToken,
        refreshToken,
        user: {
          email,
          name,
        },
      } as AuthUserResponse);

      await action(dispatch, getState, undefined);

      expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
        'user/registerUser/pending',
        'user/registerUser/fulfilled',
      ]);

      const cookieCtrl = new Cookies();

      expect(apiModule.registerUser).toHaveBeenCalledTimes(1);
      expect(cookieCtrl.get('accessSchema')).toEqual(accessSchema);
      expect(cookieCtrl.get('accessToken')).toEqual(accessToken);
      expect(localStorage.getItem('authRefreshToken')).toEqual(refreshToken);
    });

    it('updates state with registerUser result (pending)', () => {
      const state = userReducer(initialState, {
        type: 'user/registerUser/pending',
      });

      expect(state.userRegistrationPhase).toEqual(
        UserRegistrationPhase.pending
      );
    });

    it('updates state with registerUser result (rejected)', () => {
      const state = userReducer(initialState, {
        type: 'user/registerUser/rejected',
      });

      expect(state.userRegistrationPhase).toEqual(
        UserRegistrationPhase.rejected
      );
    });

    it('updates state with registerUser result', () => {
      const user = Symbol('user');
      const state = userReducer(initialState, {
        type: 'user/registerUser/fulfilled',
        payload: { user },
      });

      expect(state.user).toEqual(user);
      expect(state.userRegistrationPhase).toEqual(
        UserRegistrationPhase.fulfilled
      );
    });
  });

  describe('login', () => {
    it('correctly call login', async () => {
      const action = login({
        email: 'test@test.ru',
        password: 'test:password',
      });
      const dispatch = jest.fn();
      const getState = jest.fn();

      const accessSchema = 'accessSchemaLoggedIn';
      const accessToken = 'accessTokenLoggedIn';
      const refreshToken = 'refreshTokenLoggedIn';
      const email = 'emailLoggedIn';
      const name = 'nameLoggedIn';

      (apiModule.login as jest.Mock).mockResolvedValueOnce({
        accessSchema,
        accessToken,
        refreshToken,
        user: {
          email,
          name,
        },
      } as AuthUserResponse);

      await action(dispatch, getState, undefined);

      expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
        'user/login/pending',
        'user/login/fulfilled',
      ]);

      const cookieCtrl = new Cookies();

      expect(apiModule.login).toHaveBeenCalledTimes(1);
      expect(cookieCtrl.get('accessSchema')).toEqual(accessSchema);
      expect(cookieCtrl.get('accessToken')).toEqual(accessToken);
      expect(localStorage.getItem('authRefreshToken')).toEqual(refreshToken);
    });

    it('updates state with login result (pending)', () => {
      const state = userReducer(initialState, {
        type: 'user/login/pending',
      });

      expect(state.userLoginPhase).toEqual(UserLoginPhase.pending);
    });

    it('updates state with login result (rejected)', () => {
      const state = userReducer(initialState, {
        type: 'user/login/rejected',
      });

      expect(state.userLoginPhase).toEqual(UserLoginPhase.rejected);
    });

    it('updates state with login result', () => {
      const user = Symbol('user');
      const state = userReducer(initialState, {
        type: 'user/login/fulfilled',
        payload: { user },
      });

      expect(state.user).toEqual(user);
      expect(state.userLoginPhase).toEqual(UserLoginPhase.fulfilled);
    });
  });

  describe('logout', () => {
    it('correctly call logout', async () => {
      const action = logout();
      const dispatch = jest.fn();
      const getState = jest.fn();

      await action(dispatch, getState, undefined);

      expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
        'user/logout/pending',
        'user/logout/fulfilled',
      ]);

      const cookieCtrl = new Cookies();

      expect(apiModule.logout).toHaveBeenCalledTimes(1);
      expect(cookieCtrl.get('accessSchema')).toEqual(undefined);
      expect(cookieCtrl.get('accessToken')).toEqual(undefined);
      expect(localStorage.getItem('authRefreshToken')).toEqual(null);
    });

    it('updates state with logout result', () => {
      const state = userReducer(initialState, {
        type: 'user/logout/fulfilled',
      });

      expect(state.user).toEqual(undefined);
    });
  });

  describe('updateUserData', () => {
    it("doesn't call updateUserData if not authenticated", async () => {
      const action = updateUserData({
        email: 'email',
        name: 'name',
        password: 'password',
      });
      const dispatch = jest.fn();
      const getState = jest.fn();

      await action(dispatch, getState, undefined);

      expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
        'user/updateUserData/pending',
        'user/updateUserData/rejected',
      ]);
      expect(apiModule.updateUserData).toHaveBeenCalledTimes(0);
    });

    it('correctly call updateUserData', async () => {
      const email = 'emailUpdated';
      const name = 'nameUpdated';
      const password = 'passwordUpdated';
      const action = updateUserData({
        email,
        name,
        password,
      });
      const dispatch = jest.fn();
      const getState = jest.fn();

      const currentAuthSchema = 'accessSchema';
      const currentAccessToken = 'accessToken';

      document.cookie = `accessSchema=${currentAuthSchema}`;
      document.cookie = `accessToken=${currentAccessToken}`;

      await action(dispatch, getState, undefined);

      expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
        'user/updateUserData/pending',
        'user/updateUserData/fulfilled',
      ]);
      expect(apiModule.updateUserData).toHaveBeenCalledTimes(1);
      expect((apiModule.updateUserData as jest.Mock).mock.calls[0][0]).toEqual({
        auth: {
          accessSchema: currentAuthSchema,
          accessToken: currentAccessToken,
        },
        data: {
          email,
          name,
          password,
        },
      });
    });

    it('correctly call updateUserData, but rejects with error', async () => {
      const email = 'emailUpdated';
      const name = 'nameUpdated';
      const password = 'passwordUpdated';
      const action = updateUserData({
        email,
        name,
        password,
      });
      const dispatch = jest.fn();
      const getState = jest.fn();

      const currentAuthSchema = 'accessSchema';
      const currentAccessToken = 'accessToken';

      document.cookie = `accessSchema=${currentAuthSchema}`;
      document.cookie = `accessToken=${currentAccessToken}`;

      const errorMessage = 'some error';

      (apiModule.updateUserData as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage)
      );

      await action(dispatch, getState, undefined);

      expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
        'user/updateUserData/pending',
        'user/updateUserData/rejected',
      ]);
      expect(apiModule.updateUserData).toHaveBeenCalledTimes(1);
      expect(dispatch.mock.calls[1][0].error.message).toEqual(errorMessage);
    });

    it('updates state with updateUserData result (pending)', () => {
      const state = userReducer(initialState, {
        type: 'user/updateUserData/pending',
      });

      expect(state.updateUserDataPhase).toEqual(UpdateUserDataPhase.pending);
    });

    it('updates state with updateUserData result (rejected)', () => {
      const state = userReducer(initialState, {
        type: 'user/updateUserData/rejected',
      });

      expect(state.updateUserDataPhase).toEqual(UpdateUserDataPhase.rejected);
    });

    it('updates state with updateUserData result (fulfilled)', () => {
      const user = Symbol('user');
      const state = userReducer(initialState, {
        type: 'user/updateUserData/fulfilled',
        payload: { user },
      });

      expect(state.user).toEqual(user);
      expect(state.updateUserDataPhase).toEqual(UpdateUserDataPhase.fulfilled);
    });

    it("doesn't call updateUserData if JWT token is expired, but there is no refresh token", async () => {
      const email = 'emailUpdated';
      const name = 'nameUpdated';
      const password = 'passwordUpdated';
      const action = updateUserData({
        email,
        name,
        password,
      });
      const dispatch = jest.fn();
      const getState = jest.fn();

      const currentAuthSchema = 'accessSchema';
      const currentAccessToken = 'accessToken';

      document.cookie = `accessSchema=${currentAuthSchema}`;
      document.cookie = `accessToken=${currentAccessToken}`;

      (apiModule.updateUserData as jest.Mock).mockRejectedValueOnce(
        new Error('jwt expired')
      );

      await action(dispatch, getState, undefined);

      expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
        'user/updateUserData/pending',
        'user/updateUserData/rejected',
      ]);
      expect(apiModule.updateUserData).toHaveBeenCalledTimes(1);
      expect(apiModule.refreshTokens).toHaveBeenCalledTimes(0);
      expect((apiModule.updateUserData as jest.Mock).mock.calls[0][0]).toEqual({
        auth: {
          accessSchema: currentAuthSchema,
          accessToken: currentAccessToken,
        },
        data: {
          email,
          name,
          password,
        },
      });
    });

    it('correctly call updateUserData if JWT token is expired', async () => {
      const email = 'emailUpdated';
      const name = 'nameUpdated';
      const password = 'passwordUpdated';
      const action = updateUserData({
        email,
        name,
        password,
      });
      const dispatch = jest.fn();
      const getState = jest.fn();

      const currentAuthSchema = 'accessSchema';
      const currentAccessToken = 'accessToken';
      const currentRefreshToken = 'authRefreshToken';

      document.cookie = `accessSchema=${currentAuthSchema}`;
      document.cookie = `accessToken=${currentAccessToken}`;
      localStorage.setItem('authRefreshToken', currentRefreshToken);

      (apiModule.updateUserData as jest.Mock).mockRejectedValueOnce(
        new Error('jwt expired')
      );

      const refreshedAuthSchema = 'accessSchemaRefreshed';
      const refreshedAccessToken = 'accessTokenRefreshed';
      const refreshedRefreshToken = 'authRefreshTokenRefreshed';

      (apiModule.refreshTokens as jest.Mock).mockResolvedValueOnce({
        accessSchema: refreshedAuthSchema,
        accessToken: refreshedAccessToken,
        refreshToken: refreshedRefreshToken,
      });

      await action(dispatch, getState, undefined);

      expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
        'user/updateUserData/pending',
        'user/updateUserData/fulfilled',
      ]);
      expect(apiModule.updateUserData).toHaveBeenCalledTimes(2);
      expect(apiModule.refreshTokens).toHaveBeenCalledTimes(1);
      expect((apiModule.updateUserData as jest.Mock).mock.calls[0][0]).toEqual({
        auth: {
          accessSchema: currentAuthSchema,
          accessToken: currentAccessToken,
        },
        data: {
          email,
          name,
          password,
        },
      });
      expect((apiModule.refreshTokens as jest.Mock).mock.calls[0][0]).toEqual({
        refreshToken: currentRefreshToken,
      });

      await expect(
        (apiModule.refreshTokens as jest.Mock).mock.results[0].value
      ).resolves.toEqual({
        accessSchema: refreshedAuthSchema,
        accessToken: refreshedAccessToken,
        refreshToken: refreshedRefreshToken,
      });

      expect(localStorage.getItem('authRefreshToken')).toEqual(
        refreshedRefreshToken
      );

      const cookieCtrl = new Cookies();

      expect(cookieCtrl.get('accessSchema')).toEqual(refreshedAuthSchema);
      expect(cookieCtrl.get('accessToken')).toEqual(refreshedAccessToken);
    });
  });
});
