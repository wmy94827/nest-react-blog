import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/roles/roles.guard';
import {
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { Roles } from '../../auth/roles/roles.decorator';
import { UserRoleEnum } from './../../user/entities/user.entity';

// applyDecorators 装饰器聚合  可以接受任意个装饰器，并且将它们应用于目标类或方法
export function Auth(roles: UserRoleEnum[] = []) {
  return applyDecorators(
    UseGuards(AuthGuard('jwt'), RolesGuard),
    ApiBearerAuth(),
    ApiResponse({}),
    ApiUnauthorizedResponse({ description: '验证失败"' }), // 返回401
    Roles(roles),
  );
}
