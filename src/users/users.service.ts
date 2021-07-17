import { Injectable } from '@nestjs/common';

type User = {
  id: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private users: Array<User> = [
    {
      id: 1,
      username: 'john',
      password: 'password',
    },
  ];

  findOne(username: string): User {
    const user = this.users.find((user) => user.username == username);
    return user;
  }
}
