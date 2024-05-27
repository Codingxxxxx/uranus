const router = require('express').Router();
const { FileUtil } = require('../../libs');
const { Api } = require('../../const');
const { ErrorCode, getResponseMessage } = Api;
const path = require('path');
const { randomUUID } = require('crypto');

const tempFileDir = path.join(__dirname, '../../../../tmp_files');

router.post('/upload/brand', async(req, res, next) => {
  try {
    const file = req.files?.brandImage;

    if (!file) {
      return res.status(400).json({
        errorCode: ErrorCode.ErrorFileNotFound,
        message: getResponseMessage(ErrorCode.ErrorFileNotFound)
      });
    }

    if (file.size > FileUtil.mbToByte(2)) {
      return res.status(400).json({
        errorCode: ErrorCode.ErrorFileTooBig,
        message: getResponseMessage(ErrorCode.ErrorFileTooBig)
      });
    }

    const uuid = randomUUID();
    const newFileName = `${uuid}_${file.name}`;
    const newPath = path.join(tempFileDir, newFileName);
    await new Promise((resolve, reject) => {
      file.mv(newPath, (err) => {
        if (err) return reject(err);
        resolve(true);
      });
    });
    res.status(202).json({
      data: {
        fileUUID: newFileName
      } 
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;