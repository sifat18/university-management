class APIError extends Error {
  constructor(
    public statusCode: number,
    message: string | undefined,
    public stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      // sending the reference and this.constructor returns the error stack trace
      Error.captureStackTrace(this, this?.constructor);
    }
  }
}

export default APIError;
