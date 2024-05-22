const ApiResponseMessage = {
  ValidationFailed: 'You didn\'t provide enough fields for this process'
};

export const ErrorCode = {
  ValidationFailed: 'ValidationFailed'
};

/**
 * Get error message from API
 * @param {string} errorCode
 */
export function getErrorMessage(errorCode, httpStatus) {
  return ApiResponseMessage[errorCode] || 'Unknown Error ' + httpStatus;
}