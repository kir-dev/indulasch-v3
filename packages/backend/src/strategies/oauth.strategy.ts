import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-oauth2';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { ConfigKeys } from '../utils/configuration';
import axios from 'axios';
import { OauthProfile } from '../types/auth.types';

const AUTH_SCH_URL = 'https://auth.sch.bme.hu';

@Injectable()
export class OauthStrategy extends PassportStrategy(Strategy, 'authsch') {
  constructor(private configService: ConfigService, private userService: UsersService) {
    super({
      authorizationURL: `${AUTH_SCH_URL}/site/login`,
      tokenURL: `${AUTH_SCH_URL}/oauth2/token`,
      clientID: configService.get(ConfigKeys.AUTHSCH_CLIENT_ID),
      clientSecret: configService.get(ConfigKeys.AUTHSCH_CLIENT_SECRET),
      callbackURL: '/admin/auth/callback',
      scope: ['basic', 'displayName', 'mail'],
    });
  }

  async validate(accessToken: string) {
    const profile = await this.fetchProfile(accessToken);
    const user = await this.userService.getUserByAuthSchId(profile.internal_id);
    if (!user) {
      return await this.userService.createUser(profile);
    }
    return user;
  }

  async fetchProfile(accessToken: string) {
    const url = new URL(AUTH_SCH_URL + '/api/profile');
    url.searchParams.append('access_token', accessToken);
    const response = await axios.get<OauthProfile>(url.toString());
    return response.data;
  }
}

@Injectable()
export class OauthGuard extends AuthGuard('authsch') {}
