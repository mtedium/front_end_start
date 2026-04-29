export const ErrorCode = {
  SUCCESS: { code: 0, message: 'ok', description: '' },
  PARAMS_ERROR: { code: 40000, message: '请求参数错误', description: '' },
  NULL_ERROR: { code: 40001, message: '请求数据为空', description: '' },
  NOT_LOGIN: { code: 40100, message: '未登录', description: '' },
  NO_AUTH: { code: 40101, message: '无权限', description: '' },
  SYSTEM_ERROR: { code: 50000, message: '系统内部异常', description: '' },
} as const;

export type ErrorCodeObj = {
  code: number;
  message: string;
  description: string;
};