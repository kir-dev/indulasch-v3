import * as process from 'process';

export default () => ({
  admin_site_callback: process.env.ADMIN_SITE_CALLBACK,
  futar_api_key: process.env.FUTAR_API_KEY,
  oauth_base_url: process.env.OAUTH_BASE_URL,
  oauth_client_id: process.env.OAUTH_CLIENT_ID,
  oauth_client_secret: process.env.OAUTH_CLIENT_SECRET,
  mongodbUri: process.env.MONGODB_URI,
  expiration: process.env.JWT_EXPIRATION || '1h',
  port: parseInt(process.env.PORT, 10) || 3000,
  secret: process.env.SECRET || 'undefined_secret',
  cors_origin: process.env.CORS_ORIGIN || '',
  mailServerUrl: process.env.MAIL_SERVER_URL,
  mailApiKey: process.env.MAIL_API_KEY,
  template_root: process.env.TEMPLATE_ROOT,
  oauth_redirect_uri: process.env.OAUTH_REDIRECT_URI,
});

export enum ConfigKeys {
  ADMIN_SITE_CALLBACK = 'admin_site_callback',
  OAUTH_REDIRECT_URI = 'oauth_redirect_uri',
  OAUTH_BASE_URL = 'oauth_base_url',
  OAUTH_CLIENT_ID = 'oauth_client_id',
  OAUTH_CLIENT_SECRET = 'oauth_client_secret',
  FUTAR_API_KEY = 'futar_api_key',
  EXPIRATION = 'expiration',
  MONGODB_URI = 'mongodbUri',
  PORT = 'port',
  SECRET = 'secret',
  CORS_ORIGIN = 'cors_origin',
  MAIL_SERVER_URL = 'mailServerUrl',
  MAIL_API_KEY = 'mailApiKey',
  TEMPLATE_ROOT = 'template_root',
}
