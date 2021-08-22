import Cookies from 'universal-cookie';
import { v4 as uuidV4 } from 'uuid';
import { AuthUserResponse, RefreshTokensResponse } from '../../types';
import { WsActionType, WsActionTypes } from '../middleware';
import { UserReducerInitialStateType } from '../reducers';

const authRefreshTokenKey = 'authRefreshToken';
const cookiesCtrl = new Cookies();

export const authenticationSideEffect = ({
  accessSchema,
  accessToken,
  refreshToken,
}: RefreshTokensResponse) => {
  const cookies = {
    accessSchema,
    accessToken,
  };

  Object.entries(cookies).forEach(([cookieName, cookieValue]) =>
    cookiesCtrl.set(cookieName, cookieValue, { path: '/' })
  );
  localStorage.setItem(authRefreshTokenKey, refreshToken);
};

export const cleanUpAuthenticationSideEffect = () => {
  localStorage.removeItem(authRefreshTokenKey);
  ['accessSchema', 'accessToken'].forEach((cookieName) =>
    cookiesCtrl.remove(cookieName, { path: '/' })
  );
};

export const generateActionTypes = (): WsActionTypes => {
  const id = uuidV4();

  return {
    wsCloseConnection: `${WsActionType.wsCloseConnection}_${id}`,
    wsConnectionSuccess: `${WsActionType.wsConnectionSuccess}_${id}`,
    wsConnectionError: `${WsActionType.wsConnectionError}_${id}`,
    wsConnectionClose: `${WsActionType.wsConnectionClose}_${id}`,
    wsGetMessage: `${WsActionType.wsGetMessage}_${id}`,
    wsOpenConnection: `${WsActionType.wsOpenConnection}_${id}`,
    wsSendMessage: `${WsActionType.wsSendMessage}_${id}`,
  };
};

export const getAccessSchemaAndToken = (): Partial<
  Pick<RefreshTokensResponse, 'accessSchema' | 'accessToken'>
> => {
  return ['accessSchema', 'accessToken'].reduce(
    (result, cookieName) =>
      Object.assign(result, {
        [cookieName]: cookiesCtrl.get(cookieName),
      }),
    {}
  );
};

export const getRefreshToken = ():
  | AuthUserResponse['refreshToken']
  | undefined => {
  return localStorage.authRefreshToken;
};

export const getAuthHeaderValue = (): string | undefined => {
  const { accessSchema, accessToken } = getAccessSchemaAndToken();

  if (accessSchema && accessToken) {
    return `${accessSchema} ${accessToken}`;
  }
};

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export const setUser = (
  state: Writeable<UserReducerInitialStateType>,
  user: NonNullable<UserReducerInitialStateType['user']>
) => {
  state.user = user;
  state.userTimeStamp = new Date().getTime();
};

export const resetUser = (state: Writeable<UserReducerInitialStateType>) => {
  delete state.user;
  delete state.userTimeStamp;
};
