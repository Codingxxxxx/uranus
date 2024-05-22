const ErrorCode = {
  ValidationFailed: 'ValidationFailed',
  ErrorUserNameTaken: 'ErrorUserNameTaken',
  ErrorInvalidUsernamePassword: 'ErrorInvalidUsernamePassword',
  ErrorUserBanned: 'ErrorUserBanned'
};

const ApiResponseMessage = {
  ValidationFailed: 'You didn\'t provide enough fields for this process',
  ErrorUserNameTaken: 'This username is already exists',
  ErrorInvalidUsernamePassword: 'Invalid username or password',
  ErrorUserBanned: 'Your user has been banned from the system. You can contact admin to unban your account'
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
  getResponseMessage
};