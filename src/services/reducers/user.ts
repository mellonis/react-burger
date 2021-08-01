import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthUserResponse, User } from '../../types';
import {
  login as apiLogin,
  logout as apiLogout,
  registerUser as apiRegisterUser,
  requestNewPasswordSetting as apiRequestNewPasswordSetting,
  requestPasswordResettingForEmail as apiRequestPasswordResettingForEmail,
} from '../api';
import {
  authenticationSideEffect,
  cleanUpAuthenticationSideEffect,
  getRefreshToken,
} from '../helpers';

export enum PasswordResettingPhase {
  initial = 'initial',
  requestingApprovalCode = 'requesting-approval-code',
  requestingCredentialsFromUser = 'requesting-credentials-from-user',
  pendingResetting = 'pending-resetting',
  fulfilled = 'fulfilled',
  rejected = 'rejected',
}

export enum UserRegistrationPhase {
  initial = 'initial',
  pending = 'pending',
  fulfilled = 'fulfilled',
  rejected = 'rejected',
}

export enum UserLoginPhase {
  initial = 'initial',
  pending = 'pending',
  fulfilled = 'fulfilled',
  rejected = 'rejected',
}

const initialState: Readonly<{
  accessToken?: string;
  passwordResettingPhase: PasswordResettingPhase;
  refreshToken?: string;
  user?: User;
  userLoginPhase: UserLoginPhase;
  userRegistrationPhase: UserRegistrationPhase;
}> = {
  passwordResettingPhase: PasswordResettingPhase.initial,
  userLoginPhase: UserLoginPhase.initial,
  userRegistrationPhase: UserRegistrationPhase.initial,
};

export const login = createAsyncThunk('user/login', apiLogin);
export const logout = createAsyncThunk('user/logout', async () => {
  const refreshToken = getRefreshToken();

  if (refreshToken) {
    return apiLogout({ refreshToken: refreshToken });
  }
});

export const registerUser = createAsyncThunk(
  'user/registerUser',
  apiRegisterUser
);

export const requestNewPasswordSetting = createAsyncThunk(
  'user/requestNewPasswordSetting',
  apiRequestNewPasswordSetting
);

export const requestPasswordResettingForEmail = createAsyncThunk(
  'user/requestPasswordResettingForEmail',
  apiRequestPasswordResettingForEmail
);

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    interruptPasswordResettingWorkflow(state) {
      state.passwordResettingPhase = PasswordResettingPhase.initial;
    },
    interruptUserRegistration(state) {
      state.userRegistrationPhase = UserRegistrationPhase.initial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestPasswordResettingForEmail.pending, (state) => {
        state.passwordResettingPhase =
          PasswordResettingPhase.requestingApprovalCode;
      })
      .addCase(requestPasswordResettingForEmail.fulfilled, (state) => {
        state.passwordResettingPhase =
          PasswordResettingPhase.requestingCredentialsFromUser;
      })
      .addCase(requestPasswordResettingForEmail.rejected, (state) => {
        state.passwordResettingPhase = PasswordResettingPhase.initial;
      });
    builder
      .addCase(requestNewPasswordSetting.pending, (state) => {
        state.passwordResettingPhase = PasswordResettingPhase.pendingResetting;
      })
      .addCase(requestNewPasswordSetting.fulfilled, (state) => {
        state.passwordResettingPhase = PasswordResettingPhase.fulfilled;
      })
      .addCase(requestNewPasswordSetting.rejected, (state) => {
        state.passwordResettingPhase = PasswordResettingPhase.rejected;
      });
    builder
      .addCase(registerUser.pending, (state) => {
        state.userRegistrationPhase = UserRegistrationPhase.pending;
      })
      .addCase(
        registerUser.fulfilled,
        (state, { payload }: PayloadAction<AuthUserResponse>) => {
          authenticationSideEffect(payload);
          state.userRegistrationPhase = UserRegistrationPhase.fulfilled;
          state.user = payload.user;
        }
      )
      .addCase(registerUser.rejected, (state) => {
        state.userRegistrationPhase = UserRegistrationPhase.rejected;
      });
    builder
      .addCase(login.pending, (state) => {
        state.userLoginPhase = UserLoginPhase.pending;
      })
      .addCase(
        login.fulfilled,
        (state, { payload }: PayloadAction<AuthUserResponse>) => {
          authenticationSideEffect(payload);
          state.userLoginPhase = UserLoginPhase.fulfilled;
          state.user = payload.user;
        }
      )
      .addCase(login.rejected, (state) => {
        state.userLoginPhase = UserLoginPhase.rejected;
      });
    builder
      .addCase(logout.pending, () => {})
      .addCase(logout.fulfilled, (state) => {
        cleanUpAuthenticationSideEffect();
        delete state.user;
        state.userLoginPhase = UserLoginPhase.initial;
      })
      .addCase(logout.rejected, () => {});
  },
});

const { reducer } = slice;

export { reducer as userReducer };

export const { interruptPasswordResettingWorkflow, interruptUserRegistration } =
  slice.actions;
