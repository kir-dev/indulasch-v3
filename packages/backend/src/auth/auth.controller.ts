import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { OauthGuard } from '../strategies/oauth.strategy';
import { ConfigKeys } from '../utils/configuration';
import { AuthService } from './auth.service';

@Controller('admin/auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {}

  @UseGuards(OauthGuard)
  @Get('login')
  async loginSso() {
    // guard redirects
  }

  @UseGuards(OauthGuard)
  @Get('callback')
  async callback(@Request() req, @Res() res) {
    const { access_token } = await this.authService.login(req.user);
    const redirectUrl = new URL(this.configService.get(ConfigKeys.ADMIN_SITE_CALLBACK));
    redirectUrl.searchParams.append('access_token', access_token);
    res.redirect(301, redirectUrl.toString());
  }
}
