import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

import { ApiKeyService } from '../api-key/api-key.service';
import { User } from '../users/users.model';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'api-key') {
  constructor(private apiKeyService: ApiKeyService) {
    super(
      { header: 'Authorization', prefix: 'Api-Key ' },
      false,
      async (apiKey: string, done: (err: UnauthorizedException | null, user?: User | boolean) => void) => {
        const apiKeyUser = await this.apiKeyService.getApiKeyAsUser(apiKey);
        if (apiKeyUser) {
          return done(null, apiKeyUser);
        }
        return done(new UnauthorizedException(), false);
      }
    );
  }
}

@Injectable()
export class ApiKeyGuard extends AuthGuard('api') {}
