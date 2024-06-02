module.exports = {
  type: 'object',
  properties: {
    tagName: {
      type: 'string',
      maxLength: 25
    }
  },
  required: ['tagName']
};