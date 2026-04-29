import { BaseResponse } from './BaseResponse';
import { ErrorCode } from './ErrorCode';

type ErrorCodeObj = { code: number; message: string; description: string };

export class ResultUtils {
  static success<T>(data: T, message: string = 'ok', description: string = ''): BaseResponse<T> {
    return new BaseResponse(ErrorCode.SUCCESS.code, data, message, description);
  }

  static error(code: ErrorCodeObj | number, message?: string, description?: string): BaseResponse<null> {
    if (typeof code === 'number') {
      return new BaseResponse(code, null, message || '', description || '');
    }
    return new BaseResponse(code.code, null, message || code.message, description || code.description);
  }
}