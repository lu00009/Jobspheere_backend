import { Response } from "express";

interface ApiResponseOptions {
  data?: any;
  statusCode?: number;
}

export class ApiResponse {
  static success(
    res: Response,
    message: string,
    data?: any,
    statusCode: number = 200
  ) {
    res.status(statusCode).json({ success: true, message, data });
  }

  static error(
    res: Response,
    message: string,
    error: any,
    statusCode: number = 500
  ) {
    res
      .status(statusCode)
      .json({ success: false, message, error: error.message });
  }
}