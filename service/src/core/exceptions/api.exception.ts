import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrCode, apiErrMsgMap } from './api.errCode.enum';

/**
 * @description 业务 api 异常
 */
export class ApiException extends HttpException {
  constructor(
    private errCode: ApiErrCode,
    statusCode: HttpStatus = HttpStatus.OK,
  ) {
    super(apiErrMsgMap[errCode], statusCode);
  }

  getErrCode(): ApiErrCode {
    return this.errCode;
  }

  getErrMsg(): string {
    return apiErrMsgMap[this.errCode];
  }
}
export { ApiErrCode };
