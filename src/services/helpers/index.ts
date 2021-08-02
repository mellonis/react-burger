import { AuthUserResponse, RefreshTokensResponse } from '../../types';

// setCookie function implementation origin https://praktikum.yandex.ru/learn/react/courses/9c61cfa4-7d8c-4632-a5a1-f54d998a3cbe/sprints/6763/topics/c86f1ac6-c774-4f52-ba9e-9bf4581507bf/lessons/4b5d818d-d8e8-4446-a400-016eced40add/
export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// setCookie function implementation origin https://praktikum.yandex.ru/learn/react/courses/9c61cfa4-7d8c-4632-a5a1-f54d998a3cbe/sprints/6763/topics/c86f1ac6-c774-4f52-ba9e-9bf4581507bf/lessons/4b5d818d-d8e8-4446-a400-016eced40add/
export function setCookie(
  name: string,
  value: string,
  props: { expires?: number | Date | string; [key: string]: any } = {}
) {
  props = { ...props }; // INFO: (mellonis) prevent side effects

  let expires = props.expires;

  if (typeof expires == 'number' && expires) {
    const date = new Date();

    date.setTime(date.getTime() + expires * 1000);

    expires = props.expires = date;
  }

  if (expires instanceof Date && expires.toUTCString) {
    props.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  let updatedCookie = name + '=' + value;

  for (const propName in props) {
    updatedCookie += '; ' + propName;

    const propValue = props[propName];

    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }

  document.cookie = updatedCookie;
}

const authRefreshTokenKey = 'authRefreshToken';

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
    setCookie(cookieName, cookieValue, { path: '/' })
  );
  localStorage.setItem(authRefreshTokenKey, refreshToken);
};

export const cleanUpAuthenticationSideEffect = () => {
  localStorage.removeItem(authRefreshTokenKey);
  ['accessSchema', 'accessToken'].forEach((cookieName) => {
    setCookie(cookieName, '', { expires: -1 });
  });
};

export const getAccessSchemaAndToken = (): Partial<
  Pick<RefreshTokensResponse, 'accessSchema' | 'accessToken'>
> => {
  return ['accessSchema', 'accessToken'].reduce(
    (result, cookieName) =>
      Object.assign(result, {
        [cookieName]: getCookie(cookieName),
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
