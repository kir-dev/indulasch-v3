import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import axios from 'axios';
import { Strategy } from 'passport-oauth2';

import { Auth0Profile } from '../types/auth.types';
import { UsersService } from '../users/users.service';
import { ConfigKeys } from '../utils/configuration';

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0') {
  constructor(
    private configService: ConfigService,
    private userService: UsersService
  ) {
    super({
      authorizationURL: `${configService.get(ConfigKeys.OAUTH_BASE_URL)}/authorize`,
      tokenURL: `${configService.get(ConfigKeys.OAUTH_BASE_URL)}/oauth/token`,
      clientID: configService.get(ConfigKeys.OAUTH_CLIENT_ID),
      clientSecret: configService.get(ConfigKeys.OAUTH_CLIENT_SECRET),
      profileURL: `${configService.get(ConfigKeys.OAUTH_BASE_URL)}/userinfo`,
      scope: ['profile', 'openid', 'email'],
      callbackURL: configService.get(ConfigKeys.OAUTH_REDIRECT_URI),
    });
  }

  async validate(accessToken: string) {
    const profile = await this.fetchProfile(accessToken);
    const user = await this.userService.getUserByAuthId(profile.sub);
    if (!user) {
      return await this.userService.createUserForAuth0User(profile);
    }
    return user;
  }

  async fetchProfile(accessToken: string) {
    const url = new URL(this.configService.get(ConfigKeys.OAUTH_BASE_URL) + '/userinfo');
    const response = await axios.get<Auth0Profile>(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
}
