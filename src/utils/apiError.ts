export class ApiError extends Error {
  statusCode: number;
  code: string | undefined;
  details?: string | undefined;
  constructor(statusCode: number, code: string, message: string) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;
  }
}
