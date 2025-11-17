import {
  TechnicaalExceptionTable,
  TechnicalExceptionType,
} from "./exception-info";

export class TechnicalException extends Error {
  public readonly type: TechnicalExceptionType;
  public readonly original?: Error;
  public readonly meta?: unknown;

  constructor(options: {
    message?: string;
    type: TechnicalExceptionType;
    error: Error;
    meta?: unknown;
  }) {
    super(options.message ?? TechnicaalExceptionTable[options.type]);
    this.type = options.type;
    this.original = options.error;
    this.meta = options.meta;
  }
}
