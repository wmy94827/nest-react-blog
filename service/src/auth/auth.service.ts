import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  // 生成token
  async createToken(user: Partial<User>) {
    return this.jwtService.sign(user);
  }

  async login(user: Partial<User>) {
    const { userId, userName, role } = user;
    const token = await this.createToken({
      userId,
      userName,
      role,
    });
    const userInfo = await this.getUser(user);
    return { token, userInfo };
  }

  getUser(user) {
    return this.userService.findOne(user.userId);
  }
}
