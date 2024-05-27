const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { AppConfig } = require('../const');

const s3Client = new S3Client({
  region: AppConfig.AWS_S3_REGION,
  credentials: {
    accessKeyId: AppConfig.AWS_S3_ACCESS_KEY,
    secretAccessKey: AppConfig.AWS_S3_SECRET
  }
});

/**
 * Upload file to remote storage
 * @param {string} objectPath file uuid, not file name
 * @param {Buffer} file 
 * @param {string | null} mimetype 
 * @typedef {Object} Output
 * @property {string} error,
 * @property {Object} outputMetadata
 * @returns {Promise<Output>}
 */
async function upload(objectPath, file, mimetype) {
  const command = new PutObjectCommand({
    Bucket: AppConfig.AWS_S3_BUCKET,
    Key: objectPath,
    Body: file,
    ContentType: mimetype
  });

  let error = null;

  const outputMetadata = await s3Client
    .send(command)
    .catch(err => {
      error = err;
    });

  return {
    error,
    outputMetadata
  };
}

module.exports = {
  upload
};