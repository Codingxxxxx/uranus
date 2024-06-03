module.exports = {
  type: 'object',
  properties: {
    categoryName: {
      type: 'string',
      maxLength: 25
    }
  },
  required: ['categoryName']
};