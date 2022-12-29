import * as process from 'process';

export default () => ({
  mongodbUri: process.env.MONGODB_URI,
  expiration: process.env.JWT_EXPIRATION || '1h',
  port: parseInt(process.env.PORT, 10) || 3000,
  secret: process.env.SECRET || 'undefined_secret',
});

export enum ConfigKeys {
  EXPIRATION = 'expiration',
  MONGODB_URI = 'mongodbUri',
  PORT = 'port',
  SECRET = 'secret',
}
