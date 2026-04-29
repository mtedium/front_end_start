import { Request, Response, NextFunction } from 'express';
import { BusinessException } from '../exception/BusinessException';
import { ResultUtils } from '../common/ResultUtils';
import { ErrorCode } from '../common/ErrorCode';

export function globalExceptionHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof BusinessException) {
    res.json(ResultUtils.error(err.code, err.message, err.description));
    return;
  }
  console.error('System error:', err);
  res.json(ResultUtils.error(ErrorCode.SYSTEM_ERROR));
}