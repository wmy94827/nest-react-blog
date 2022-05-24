import {
  Controller,
  Post,
  Body,
  Req,
  UseInterceptors,
  UseGuards,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport'; // 守卫
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('验证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '登录' })
  @Post('login')
  @UseGuards(AuthGuard('local')) // 守卫控制器
  @UseInterceptors(ClassSerializerInterceptor) // 不包含密码 @Exclude()的字段
  async login(@Body() _: LoginDto, @Req() req) {
    // req 守卫会将用户信息放入 req.user local.strategy.ts
    return this.authService.login(req.user);
  }
}
