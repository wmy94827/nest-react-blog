import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Article } from '../../article/entities/article.entity';

@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  tagId: string;

  @Column({ name: 'name', comment: '标签名称' })
  tagName: string;

  @Column({
    name: 'delete_flag',
    comment: '标签状态 -1:删除 0:启用',
    type: 'int',
    default: 0,
  })
  deleteFlag: number;

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

  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[];
}
