import { UserRoleEnum } from './../../user/entities/user.entity';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'role';
export const Roles = (roles: UserRoleEnum[]) => SetMetadata(ROLES_KEY, roles);
