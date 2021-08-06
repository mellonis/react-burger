import { AuthUserResponse, RefreshTokensResponse } from '../../types';
import Cookies from 'universal-cookie';

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
    cookiesCtrl.remove(cookieName)
  );
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

export const setUser = (state: any, user: any) => {
  state.user = user;
  state.userTimeStamp = new Date().getTime();
};

export const resetUser = (state: any) => {
  delete state.user;
  delete state.userTimeStamp;
};
