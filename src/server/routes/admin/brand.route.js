const router = require('express').Router();
const { Admin } = require('../../const');
const { Api } = require('../../const');
const { Validator, FileHandler, FileUtil, Slug } = require('../../libs/');
const { BrandRepository } = require('../../repos');
const { SideBarMenu } = Admin;
const { ErrorCode, getResponseMessage } = Api;

router.get('/brand/add', async(req, res, next) => {
  try {
    res.render('admin/pages/brand/create-brand.html', {
      $page: {
        sidebar: {
          active: SideBarMenu.BRAND
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

router.post('/brand/add', async(req, res, next) => {
  try {
    if (!Validator.validateBrandCreation(req.body)) {
      return res.status(400).json({
        errorCode: ErrorCode.ValidationFailed,
        message: getResponseMessage(ErrorCode.ValidationFailed),
        data: {
          errors: Validator.validateBrandCreation.errors
        }
      });
    }
    
    const { brandName, fileUUID } = req.body;
    // check if brand name not taken
    if (await BrandRepository.getBrandByBrandName(brandName)) {
      return res.status(400).json({
        errorCode: ErrorCode.ErrorBrandNameTaken,
        message: getResponseMessage(ErrorCode.ErrorBrandNameTaken)
      });
    }

    const fileMetaData = await FileUtil.getFileFromTempDir(fileUUID);

    if (!fileMetaData) {
      return res.status(400).json({
        errorCode: ErrorCode.ErrorFileNotFound,
        message: getResponseMessage(ErrorCode.ErrorFileNotFound)
      });
    }

    // insert to db
    const brand = await BrandRepository.createBrand({
      brandName: brandName.trim(),
      slug: Slug.slugify(brandName.trim()),
      brandImage: {
        fileUrl: fileMetaData.fileUrl,
        filename: fileMetaData.filename,
        mimetype: fileMetaData.mimetype,
        size: fileMetaData.fileSize
      }
    });

    const objectPath = FileUtil.createBrandImageObjectPath(brand._id, brand.brandImage.fileUrl);
    
    const { error } = await FileHandler.upload(objectPath, fileMetaData.fileBuffer, fileMetaData.mimetype);

    if (error) {
      // write log
      throw error;
    }

    // remove file from tmp
    await FileUtil.deleteFileFromTempDir(fileUUID);

    res.status(201).json(null);
  } catch (error) {
    next(error);
  }
});

module.exports = router;