import { TUser } from "./User";

export type TCredentials = {
  username: string;
  password: string;
};

export type TRegister = {
  username: string;
  password: string;
};

export type TAuth = {
  token: string | null;
  refresh: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: TUser | null;
};

export type TTokenResponse = {
  access: string;
  refresh: string;
};

export type TToken = string;

export type TAuthError = {
  detail: string;
};

export type TTokenData = {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
};
