const ErrorCode = {
  ValidationFailed: 'ValidationFailed',
  ErrorUserNameTaken: 'ErrorUserNameTaken',
  ErrorInvalidUsernamePassword: 'ErrorInvalidUsernamePassword',
  ErrorUserBanned: 'ErrorUserBanned',
  ErrorFileTooBig: 'ErrorFileTooBig',
  ErrorFileNotFound: 'ErrorFileNotFound',
  ErrorBrandNameTaken: 'ErrorBrandNameTaken',
  ErrorTagNameTaken: 'ErrorTagNameTaken'
};

const ApiResponseMessage = {
  ValidationFailed: 'You didn\'t provide enough fields for this process',
  ErrorUserNameTaken: 'This username is already exists',
  ErrorInvalidUsernamePassword: 'Invalid username or password',
  ErrorUserBanned: 'Your user has been banned from the system. You can contact admin to unban your account',
  ErrorFileTooBig: 'Uploaded file exceeded the limit',
  ErrorFileNotFound: 'File not found',
  ErrorBrandNameTaken: 'This brand name is already taken.',
  ErrorTagNameTaken: 'This brand name is already taken.'
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