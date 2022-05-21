import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';

export enum UserRoleEnum {
  User = 'user',
  Admin = 'admin',
}
@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ name: 'user_name', length: 100, comment: '用户名' })
  userName: string;

  @Column({ name: 'nick_name', length: 100, default: '', comment: '昵称' })
  nickName: string;

  @Exclude()
  @Column({ comment: '密码' })
  password: string;

  @Column({ comment: '邮箱', nullable: true })
  email: string;

  @Column({ comment: '手机号', nullable: true })
  phone: string;

  @Column({ comment: '头像', nullable: true })
  avatar: string;

  @Column('simple-enum', {
    enum: UserRoleEnum,
    comment: '角色',
    default: UserRoleEnum.User,
  })
  role: string;

  @CreateDateColumn({
    name: 'create_time',
    type: 'timestamp',
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    name: 'update_time',
    type: 'timestamp',
    comment: '更新时间',
  })
  updateTime: Date;

  @BeforeInsert()
  async encryptPwd() {
    if (!this.password) return;
    this.password = await bcrypt.hashSync(this.password);
  }
}
