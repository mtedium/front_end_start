export class BaseResponse<T> {
  code: number;
  data: T;
  message: string;
  description: string;

  constructor(code: number, data: T, message: string, description: string) {
    this.code = code;
    this.data = data;
    this.message = message;
    this.description = description;
  }
}
