const ErrorCode = {
  ValidationFailed: 'ValidationFailed',
  ErrorUserNameTaken: 'ErrorUserNameTaken'
};

const ApiResponseMessage = {
  ValidationFailed: 'You didn\'t provide enough fields for this process',
  ErrorUserNameTaken: 'This username is already exists'
};

/**
 * Get error message for api
 * @param {string} errorCode
 * @returns {string}
 */
function getResponseMessage(errorCode) {
  return ApiResponseMessage[errorCode] || 'Unexpect error, please try again later';
}

module.exports = {
  ErrorCode,
  ApiResponseMessage,
  getResponseMessage
};