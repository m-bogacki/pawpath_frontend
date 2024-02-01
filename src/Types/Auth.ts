import { TUser } from "./User";

export type TCredentials = {
  username: string;
  password: string;
};

export type TRegister = {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
};

export type TAuth = {
  token: string | null;
  refresh: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: any;
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
