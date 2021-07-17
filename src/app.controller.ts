import { Controller, Get, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    throw new HttpException(
      { key: 'test.HELLO_MESSAGE', args: { username: 'rubin' } },
      HttpStatus.FORBIDDEN,
    );
  }

  @Get('nologin')
  nologin(): string {
    throw new HttpException(
      { key: 'test.HELLO_MESSAGE', args: { username: 'rubin' } },
      HttpStatus.FORBIDDEN,
    );
  }
}
