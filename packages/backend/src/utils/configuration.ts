import * as process from 'process';

export default () => ({
  admin_site_callback: process.env.ADMIN_SITE_CALLBACK,
  futar_api_key: process.env.FUTAR_API_KEY,
  authSch_client_id: process.env.AUTHSCH_CLIENT_ID,
  authSch_client_secret: process.env.AUTHSCH_CLIENT_SECRET,
  mongodbUri: process.env.MONGODB_URI,
  expiration: process.env.JWT_EXPIRATION || '1h',
  port: parseInt(process.env.PORT, 10) || 3000,
  secret: process.env.SECRET || 'undefined_secret',
  cors_origin: process.env.CORS_ORIGIN || '',
  mailServerUrl: process.env.MAIL_SERVER_URL,
  mailApiKey: process.env.MAIL_API_KEY,
});

export enum ConfigKeys {
  ADMIN_SITE_CALLBACK = 'admin_site_callback',
  AUTHSCH_CLIENT_ID = 'authSch_client_id',
  AUTHSCH_CLIENT_SECRET = 'authSch_client_secret',
  FUTAR_API_KEY = 'futar_api_key',
  EXPIRATION = 'expiration',
  MONGODB_URI = 'mongodbUri',
  PORT = 'port',
  SECRET = 'secret',
  CORS_ORIGIN = 'cors_origin',
  MAIL_SERVER_URL = 'mailServerUrl',
  MAIL_API_KEY = 'mailApiKey',
}
