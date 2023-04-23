export type JwtPayload = {
  /** Issuer (who created and signed this token) */
  iss?: string;
  /** Subject (whom the token refers to) */
  sub?: string;
  /** Audience (who or what the token is intended for) */
  aud?: string[];
  /** Issued at (seconds since Unix epoch) */
  iat?: number;
  /** Expiration time (seconds since Unix epoch) */
  exp?: number;
  /** Authorization party (the party to which this token was issued) */
  azp?: string;
  /** Token scope (what the token has access to) */
  scope?: string;
};

type FindById = {
  id: number;
  email?: never;
};

type FindByEmail = {
  id?: never;
  email: string;
};

export type FindOneQuery = FindById | FindByEmail;

export type Auth0Resp = {
  access_token: string;
  expires_in: number;
  token_type: string;
};
