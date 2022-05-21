import { compareSync } from 'bcryptjs';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiErrCode, ApiException } from '../core/exceptions/api.exception';

export class LocalStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    // 如果不是userName、password， 在constructor中配置
    super({
      usernameField: 'userName',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(userName: string, password: string) {
    // 因为密码是加密后的，没有办法直接对比用户名密码，只能先根据用户名查出用户，再对比密码
    const user = await this.userRepository.findOne({
      where: { userName },
    });
    console.log(user, 'user');
    if (!user) {
      throw new ApiException(ApiErrCode.USER_NOT_EXIST);
    }

    if (!compareSync(password, user.password)) {
      // 对比密码 如果不正确，抛出异常
      throw new ApiException(ApiErrCode.PASSWORD_ERROR);
    }

    return user;
  }
}
