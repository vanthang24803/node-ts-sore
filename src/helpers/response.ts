import { Status } from "../enum/status";

function responseStatus(status: Status, message?: string | object) {
  let isSuccess: boolean;

  switch (status) {
    case Status.Success:
      isSuccess = true;
      break;
    case Status.BadRequest:
      isSuccess = false;
      message = `${message}`;
      break;
    case Status.Created:
      isSuccess = true;
      break;
    case Status.NotFound:
      isSuccess = false;
      message = `${message} not found`;
      break;
    case Status.ServerError:
      isSuccess = false;
      message = "Server is error";
      break;
    default:
      isSuccess = false;
      break;
  }

  return {
    isSuccess,
    message,
  };
}

export default responseStatus;
