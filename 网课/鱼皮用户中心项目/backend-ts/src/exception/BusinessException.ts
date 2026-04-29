import { ErrorCode } from '../common/ErrorCode';

type ErrorCodeObj = { code: number; message: string; description: string };

export class BusinessException extends Error {
  code: number;
  description: string;

  constructor(errorCode: ErrorCodeObj, description?: string) {
    super(errorCode.message);
    this.code = errorCode.code;
    this.description = description || errorCode.description;
  }
}