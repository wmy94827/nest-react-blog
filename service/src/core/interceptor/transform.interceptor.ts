import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ApiErrCode, apiErrMsgMap } from '../exceptions/api.errCode.enum';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const code = ApiErrCode.SUCCESS;
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code,
          msg: apiErrMsgMap[code],
        };
      }),
    );
  }
}
