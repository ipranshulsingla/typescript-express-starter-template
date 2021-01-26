import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { logger } from '../utils/logger';

export default function (
  error: HttpException,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    logger.error(error);
    res.status(error.status).json({ message: error.message });
  } catch (error) {
    next(error);
  }
}
