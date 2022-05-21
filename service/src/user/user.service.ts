import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiException, ApiErrCode } from '../core/exceptions/api.exception';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(createUser: CreateUserDto) {
    const { userName } = createUser;
    // 判断用户名是否存在
    const existUser = await this.userRepository.findOne({
      where: { userName },
    });
    if (existUser) {
      throw new ApiException(ApiErrCode.USER_EXIST);
    }
    const newUser = await this.userRepository.create(createUser);
    await this.userRepository.save(newUser);
    return {};
  }

  async findOne(userId: string) {
    const userInfo = await this.userRepository.findOne({
      where: { userId },
    });
    return userInfo;
  }
}
