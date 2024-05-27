const { File } = require('../const');
const path = require('path');
const fs = require('fs/promises');
const { lookup } = require('mime-types');
const buffer = require('node:buffer');

const fileTempDirPath = path.join(__dirname, '../../../', File.fileTempDirName);

/**
 * Get file stats and data from tmp dir
 * @param {string} filename file name
 * @typedef {Object} FileData
 * @property {buffer.File} file 
 * @property {string} fileUUID
 * @property {string} fileUrl
 * @property {Buffer} fileBuffer
 * @property {string} filename
 * @property {number} fileSize
 * @property {string} mimetype
 * @returns {Promise<FileData>}
 */
async function getFileFromTempDir(filename) {
  const fullPath = path.join(fileTempDirPath, filename);
  const extension = path.parse(fullPath).ext;
  const fileBuffer = await fs.readFile(fullPath).catch(err => {
    console.info(err);
  });

  // file not found
  if (!fileBuffer) return null;

  const seperatorIdx = filename.indexOf('_');
  const fileUUID = filename.substring(0, seperatorIdx);
  const fileUrl = fileUUID + extension;
  const originalFilename = filename.substring(seperatorIdx + 1, filename.legnth);
  const fileStats = await fs.stat(fullPath);
  const fsize = fileStats.size;
  const mimetype = lookup(fullPath);
  const file = new buffer.File(fileBuffer, originalFilename, { type: mimetype });

  return {
    file,
    fileUUID,
    fileUrl,
    fileBuffer,
    filename: originalFilename,
    fileSize: fsize,
    mimetype: mimetype || ''
  };
}

/***
 * Delete file from tmp dir
 * @param {string} filename file name
 * @returns {Promise<void>}
 */
function deleteFileFromTempDir(filename) {
  const fullPath = path.join(fileTempDirPath, filename);
  return fs.unlink(fullPath);
}

/**
 * Convert mb to byte
 * @param {number} mb Size in megabytes
 * @returns {number}
 */
function mbToByte(mb) {
  return mb * 1048576;
}

const AllObjectPath = {
  BrandImage: 'brands/{id}/{fileUrl}'
};

/**
 * Create path to object url
 * @param {string} id brand id
 * @param {string} fileUrl file url
 * @returns {string}
 */
function createBrandImageObjectPath(id, fileUrl) {
  const urlPattern = AllObjectPath.BrandImage;

  return urlPattern
    .replace('{id}', id)
    .replace('{fileUrl}', fileUrl);
}

module.exports = {
  mbToByte,
  getFileFromTempDir,
  deleteFileFromTempDir,
  createBrandImageObjectPath
};