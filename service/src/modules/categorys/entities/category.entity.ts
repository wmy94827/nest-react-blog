import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Article } from './../../article/entities/article.entity';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  categoryId: string;

  @Column({ name: 'name', comment: '分类名称' })
  categoryName: string;

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

  @OneToMany(() => Article, (article) => article.category)
  article: Article;
}
