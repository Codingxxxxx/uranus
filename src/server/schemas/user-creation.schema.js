module.exports = {
  type: 'object',
  properties: {
    firstname: {
      type: 'string',
      maxLength: 50
    },
    lastname: {
      type: 'string',
      maxLength: 50
    },
    username: {
      type: 'string',
      minLength: 5,
      maxLength: 15
    },
    password: {
      type: 'string',
      nullable: true,
      minLength: 6
    },
    role: {
      type: 'string'
    }
  },
  required: ['firstname', 'lastname', 'username', 'role']
};