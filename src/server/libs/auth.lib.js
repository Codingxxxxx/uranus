const { createHash, pbkdf2, randomBytes } = require('crypto');

/**
 * Generate random long string
 * @returns {string} salt as basee64 format
 */
async function generateRandomSalt() {
  const saltInByte = await new Promise((resolve, reject) => {
    randomBytes(64, (err, buff) => {
      if (err) return reject(err);
      resolve(buff);
    });
  });

  return createHash('sha256')
    .update(saltInByte)
    .digest('base64');
}

/**
 * Hash plain password
 * @param {string} plainText Plain password
 * @param {string} salt
 * @typedef {string[]} Tokens
 * @property {string} 0 - The first string is password
 * @property {string} 1 - The second string is salt
 * @returns {Promise<Tokens>}
 */
async function hashPassword(plainText, salt) {
  salt = Buffer.from(salt || await generateRandomSalt(), 'base64');
  const passwordAsBytes = Buffer.from(plainText);
  return new Promise((resolve, reject) => {
    pbkdf2(passwordAsBytes, salt, 10000, 64, 'sha256', (err, newPass) => {
      if (err) return reject(err);
      resolve([newPass.toString('base64'), salt.toString('base64')]);
    });
  });
}

const Auth = {
  hashPassword
};

module.exports = {
  Auth
};