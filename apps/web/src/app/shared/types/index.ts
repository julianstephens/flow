export * from "./users";

export type Environment = {
  isProd: boolean;
  auth: {
    domain?: string;
    clientId?: string;
  };
  apiUri: string;
};
