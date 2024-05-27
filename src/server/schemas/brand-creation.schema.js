module.exports = {
  type: 'object',
  properties: {
    brandName: {
      type: 'string',
      maxLength: 25,
      minLength: 1
    },
    fileUUID: {
      type: 'string',
      maxLength: 250,
      minLength: 1
    }
  },
  required: ['brandName', 'fileUUID']
};