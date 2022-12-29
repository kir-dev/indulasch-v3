export type CredentialsDto = {
  username: string;
  password: string;
};

export type JwtDto = {
  iat: number;
  exp: number;
} & JwtUser;

export type JwtUser = {
  username: string;
  uid: string;
};
