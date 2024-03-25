function responseStatus(status: number, message?: string | object) {
  let isSuccess: boolean;

  switch (status) {
    case 200:
      isSuccess = true;
      break;
    case 400:
    case 404:
      isSuccess = false;
      message = `${message} not found`;
      break;
    case 500:
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
