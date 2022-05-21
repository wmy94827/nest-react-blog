import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';

const PREFIX = 'api';
const POST = 8888;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api'); // 设置全局路由前缀
  app.useGlobalFilters(new HttpExceptionFilter()); // 全局注册过滤器
  app.useGlobalInterceptors(new TransformInterceptor()); //全局注册拦截器
  app.useGlobalPipes(new ValidationPipe()); // 全局注册验证管道
  // 设置静态资源 express
  app.useStaticAssets('public', {
    prefix: '/static', // 一定不可以省略 '/'
  });

  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('管理后台')
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  }); // 允许跨域
  await app.listen(POST, () => {
    // console.log(process.env.NODE_ENV, 'process.env.NODE_ENV');
    Logger.log(`服务已经启动,接口请访问:http://localhost:${POST}/${PREFIX}`);
  });
}
bootstrap();
