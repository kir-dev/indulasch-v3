import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import axios from 'axios';
import { Strategy } from 'passport-oauth2';

import { AuthSchProfile } from '../types/auth.types';
import { UsersService } from '../users/users.service';
import { ConfigKeys } from '../utils/configuration';

@Injectable()
export class OauthStrategy extends PassportStrategy(Strategy, 'authsch') {
  constructor(
    private configService: ConfigService,
    private userService: UsersService
  ) {
    super({
      authorizationURL: `${configService.get(ConfigKeys.OAUTH_BASE_URL)}/site/login`,
      tokenURL: `${configService.get(ConfigKeys.OAUTH_BASE_URL)}/oauth2/token`,
      clientID: configService.get(ConfigKeys.OAUTH_CLIENT_ID),
      clientSecret: configService.get(ConfigKeys.OAUTH_CLIENT_SECRET),
      scope: ['basic', 'displayName', 'mail'],
    });
  }

  async validate(accessToken: string) {
    const profile = await this.fetchProfile(accessToken);
    const user = await this.userService.getUserByAuthId(profile.internal_id);
    if (!user) {
      return await this.userService.createUserForAuthSchUser(profile);
    }
    return user;
  }

  async fetchProfile(accessToken: string) {
    const url = new URL(this.configService.get(ConfigKeys.OAUTH_BASE_URL) + '/api/profile');
    url.searchParams.append('access_token', accessToken);
    const response = await axios.get<AuthSchProfile>(url.toString());
    return response.data;
  }
}
