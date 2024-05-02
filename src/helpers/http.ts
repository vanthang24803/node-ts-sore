import { Response } from 'express';
import { Status } from '@/enum/status';

export class Http {
  public static Ok(res: Response, response: object | string) {
    return res
      .status(Status.Success)
      .json({ status: Status.Success, message: response });
  }

  public static Created(res: Response, response: object | string) {
    return res
      .status(Status.Created)
      .json({ status: Status.Created, message: response });
  }

  public static BadRequest(res: Response, response: unknown) {
    return res
      .status(Status.BadRequest)
      .json({ status: Status.BadRequest, message: response });
  }

  public static NotFound(res: Response, response: string) {
    return res.status(Status.NotFound).json({
      status: Status.NotFound,
      message: response,
    });
  }

  public static Unauthorized(res: Response) {
    return res.status(Status.Unauthorized).json({
      status: Status.Unauthorized,
      message: 'Unauthorized',
    });
  }

  public static Forbidden(res: Response) {
    return res.status(Status.Forbidden).json({
      status: Status.Forbidden,
      message: 'Forbidden',
    });
  }

  public static ServerError(res: Response) {
    return res.status(Status.ServerError).json({
      status: Status.ServerError,
      message: 'Internal Server Error',
    });
  }
}
