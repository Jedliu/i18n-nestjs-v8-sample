import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && password === user.password) {
      return user;
    }

    throw new UnauthorizedException();
  }

  async login(user: any) {
    const payload = { sub: user.id };

    return {
      user: {
        id: user.id,
      },
      access_token: this.jwtService.sign(payload),
    };
  }
}
