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
};

export type Token = {
  access: string;
  refresh: string;
};

export type TAuthError = {
  detail: string;
};
