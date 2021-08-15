import {
  AuthUserResponse,
  Ingredient_t,
  OrderDetails_t,
  OrderStatus_t,
  RefreshTokensResponse,
  User,
  UserResponse,
} from '../../types';
import { apiHostUrl } from './consts';

const getAccessSchemaAndTokenAndRefreshToken = (
  response: any
): RefreshTokensResponse => {
  const { accessToken: accessTokenWithSchema, refreshToken } = response;
  const [accessSchema, accessToken] = accessTokenWithSchema.split(' ');

  return {
    accessSchema,
    accessToken,
    refreshToken,
  };
};

export const fetchIngredients = async (): Promise<Ingredient_t[]> => {
  const response = await fetch(`${apiHostUrl}/api/ingredients`);
  const result = await response.json();

  if (result.success === true) {
    return result.data;
  } else {
    throw new Error("Can't get data from server");
  }
};

interface LoginRequestParams {
  email: string;
  password: string;
}

export const login = async ({
  email,
  password,
}: LoginRequestParams): Promise<AuthUserResponse> => {
  const response = await fetch(`${apiHostUrl}/api/auth/login`, {
    body: JSON.stringify({ email, password }),
    headers: new Headers([['Content-Type', 'application/json']]),
    method: 'POST',
  });
  const result = await response.json();

  if (result.success !== true) {
    throw new Error("Can't get data from server");
  }

  const {
    user: { email: userEmailFromServer, name: userNameFromServer },
  } = result;

  return {
    ...getAccessSchemaAndTokenAndRefreshToken(result),
    user: {
      email: userEmailFromServer,
      name: userNameFromServer,
    },
  };
};

export const logout = async ({
  refreshToken,
}: Pick<RefreshTokensResponse, 'refreshToken'>): Promise<void> => {
  const response = await fetch(`${apiHostUrl}/api/auth/logout`, {
    body: JSON.stringify({ token: refreshToken }),
    headers: new Headers([['Content-Type', 'application/json']]),
    method: 'POST',
  });
  const result = await response.json();

  if (result.success !== true) {
    throw new Error("Can't get data from server");
  }
};

export const placeAnOrder = async ({
  ingredients,
  auth: { accessSchema, accessToken },
}: {
  ingredients: Ingredient_t['_id'][];
} & GetUserDataParams): Promise<OrderDetails_t> => {
  const response = await fetch(`${apiHostUrl}/api/orders`, {
    body: JSON.stringify({ ingredients }),
    headers: new Headers([
      ['Content-Type', 'application/json'],
      ['Authorization', `${accessSchema} ${accessToken}`],
    ]),
    method: 'POST',
  });
  const result = await response.json();

  if (result.success === true) {
    return {
      id: result.order.number,
      message: 'Дождитесь готовности на орбитальной станции',
      status: OrderStatus_t.pending,
    };
  } else {
    throw new Error("Can't get data from server");
  }
};

export const refreshTokens = async ({
  refreshToken: token,
}: Pick<
  RefreshTokensResponse,
  'refreshToken'
>): Promise<RefreshTokensResponse> => {
  const response = await fetch(`${apiHostUrl}/api/auth/token`, {
    body: JSON.stringify({ token }),
    headers: new Headers([['Content-Type', 'application/json']]),
    method: 'POST',
  });
  const result = await response.json();

  if (result.success === true) {
    return getAccessSchemaAndTokenAndRefreshToken(result);
  } else {
    throw new Error("Can't get data from server");
  }
};

interface RegisterUserRequestParams {
  email: string;
  name: string;
  password: string;
}

export const registerUser = async ({
  email,
  name,
  password,
}: RegisterUserRequestParams): Promise<AuthUserResponse> => {
  const response = await fetch(`${apiHostUrl}/api/auth/register`, {
    body: JSON.stringify({ email, name, password }),
    headers: new Headers([['Content-Type', 'application/json']]),
    method: 'POST',
  });
  const result = await response.json();

  if (result.success !== true) {
    throw new Error("Can't get data from server");
  }

  const {
    accessToken: accessTokenWithSchema,
    refreshToken,
    user: { email: userEmailFromServer, name: userNameFromServer },
  } = result;

  const [accessSchema, accessToken] = accessTokenWithSchema.split(' ');

  return {
    accessSchema,
    accessToken,
    refreshToken,
    user: {
      email: userEmailFromServer,
      name: userNameFromServer,
    },
  };
};

interface RequestPasswordResettingForEmailParams {
  email: string;
}

export const requestPasswordResettingForEmail = async ({
  email,
}: RequestPasswordResettingForEmailParams): Promise<void> => {
  const response = await fetch(`${apiHostUrl}/api/password-reset`, {
    body: JSON.stringify({ email }),
    headers: new Headers([['Content-Type', 'application/json']]),
    method: 'POST',
  });
  const result = await response.json();

  if (result.success !== true) {
    throw new Error("Can't get data from server");
  }
};

interface RequestNewPasswordSettingParams {
  password: string;
  token: string;
}

export const requestNewPasswordSetting = async ({
  password,
  token,
}: RequestNewPasswordSettingParams): Promise<void> => {
  const response = await fetch(`${apiHostUrl}/api/password-reset/reset`, {
    body: JSON.stringify({ password, token }),
    headers: new Headers([['Content-Type', 'application/json']]),
    method: 'POST',
  });
  const result = await response.json();

  if (result.success !== true) {
    throw new Error("Can't get data from server");
  }
};

type AccessSchemaWithToken = Pick<
  RefreshTokensResponse,
  'accessSchema' | 'accessToken'
>;

type GetUserDataParams = {
  auth: AccessSchemaWithToken;
};

export const getUserData = async ({
  auth: { accessSchema, accessToken },
}: GetUserDataParams): Promise<User> => {
  const response = await fetch(`${apiHostUrl}/api/auth/user`, {
    headers: new Headers([
      ['Content-Type', 'application/json'],
      ['Authorization', `${accessSchema} ${accessToken}`],
    ]),
    method: 'GET',
  });
  const result = await response.json();

  if (result.success !== true) {
    throw new Error("Can't get data from server");
  }

  return result.user;
};

type UpdateUserDataParams = {
  auth: AccessSchemaWithToken;
  data: {
    email: string;
    name: string;
    password: string;
  };
};

export const updateUserData = async ({
  auth: { accessSchema, accessToken },
  data: { email, name, password },
}: UpdateUserDataParams): Promise<UserResponse> => {
  const response = await fetch(`${apiHostUrl}/api/auth/user`, {
    body: JSON.stringify({ name, email, password }),
    headers: new Headers([
      ['Content-Type', 'application/json'],
      ['Authorization', `${accessSchema} ${accessToken}`],
    ]),
    method: 'PATCH',
  });
  const result = await response.json();

  if (result.success !== true) {
    throw new Error("Can't get data from server");
  }

  return {
    user: result.user,
  };
};

export { apiHostUrl };
