import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../categorys/entities/category.entity';
import { Tag } from '../../tags/entities/tag.entity';

@Entity('article')
export class Article {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  articleId: string;

  @Column({ unique: true, comment: '文章标题' })
  title: string;

  @Exclude()
  @Column({ type: 'text', comment: '文章内容' })
  content: string;

  @Column({ comment: '内容概览' })
  summary: string;

  @Column({ name: 'cover_image', comment: '封面' })
  coverImage: string;

  @Column({ name: 'reading_num', comment: '阅读量', default: 0 })
  readingNum: number;

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

  @Column({ comment: '拓展字段', nullable: true })
  remark01: string;

  @Column({ comment: '拓展字段', nullable: true })
  remark02: string;

  @Column({ comment: '拓展字段', nullable: true })
  remark03: string;

  // 多对一关系 - 一个文章只能属于一个分类
  @ManyToOne(() => Category, (category) => category.article)
  category: Category;

  // 多对多关系  一个文章可以有多个标签 一个标签可以有多个文章
  @ManyToMany(() => Tag, (tag) => tag.articles, {
    cascade: true,
  })
  @JoinTable()
  tags: Tag[];
}
