import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { ApiException } from '../exceptions/api.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取请求上下文中的 response对象
    const status = exception.getStatus(); // 获取异常状态码
    const exceptionResponse: any = exception.getResponse(); // 获取异常信息

    if (exception instanceof ApiException) {
      // 业务 api 异常
      response.status(status).json({
        code: exception.getErrCode(),
        msg: exception.getErrMsg(),
      });
    } else if (exception instanceof UnauthorizedException) {
      // 授权异常 未登录
      response.status(200).json({
        code: exceptionResponse.statusCode,
        msg:
          exceptionResponse.message === 'Unauthorized'
            ? '请登录'
            : exceptionResponse.message,
      });
    } else if (exception instanceof ForbiddenException) {
      // 授权异常 无权限
      response.status(200).json({
        code: exceptionResponse.statusCode,
        msg:
          exceptionResponse.message === 'Forbidden resource'
            ? '当前用户没有权限'
            : exceptionResponse.message,
      });
    } else {
      if (status === 400 && typeof exceptionResponse === 'object') {
        const validMessage =
          typeof exceptionResponse.message === 'string'
            ? exceptionResponse.message
            : exceptionResponse.message[0];
        response.status(200).json({
          code: status,
          msg: validMessage,
        });
        return;
      }
      response.status(status).json({
        code: status,
        msg: exception.message,
      });
    }
  }
}
