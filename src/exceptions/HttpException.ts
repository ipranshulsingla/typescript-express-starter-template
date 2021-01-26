class HttpException extends Error {
  public readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  public toString() {
    return `StatusCode: ${this.status}, Message: ${this.message}`;
  }
}

export default HttpException;
