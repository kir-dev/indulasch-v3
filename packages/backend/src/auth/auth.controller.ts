import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigKeys } from '../utils/configuration';
import { AuthService } from './auth.service';
import { OauthGuard } from './oauth.guard';

@Controller('admin/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @UseGuards(OauthGuard)
  @Get('login')
  async loginSso() {
    // guard redirects
  }

  @UseGuards(OauthGuard)
  @Get('callback')
  async callback(@Request() req, @Res() res) {
    const { access_token: accessToken } = await this.authService.login(req.user);
    const redirectUrl = new URL(this.configService.get(ConfigKeys.ADMIN_SITE_CALLBACK));
    redirectUrl.searchParams.append('access_token', accessToken);
    res.redirect(301, redirectUrl.toString());
  }
}
