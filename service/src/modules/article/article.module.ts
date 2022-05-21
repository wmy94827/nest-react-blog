import { Category } from './../categorys/entities/category.entity';
import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Tag } from '../tags/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Tag, Category])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
