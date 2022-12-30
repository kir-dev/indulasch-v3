export type OauthProfile = {
  internal_id: string;
  displayName: string;
  mail: string;
};

export type JwtDto = {
  iat: number;
  exp: number;
} & JwtUser;

export type JwtUser = {
  username: string;
  uid: string;
};
