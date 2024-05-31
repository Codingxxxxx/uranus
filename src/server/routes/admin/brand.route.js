const router = require('express').Router();
const { Admin } = require('../../const');
const { Api } = require('../../const');
const { Validator, FileHandler, FileUtil, Slug, SessionHandler, Logger } = require('../../libs/');
const { formatErrorMessage } = require('../../libs/logger.lib');
const { BrandRepository } = require('../../repos');
const { SideBarMenu } = Admin;
const { ErrorCode, getResponseMessage } = Api;
const { adminLogger } = Logger;

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

    const fileMetaData = await FileUtil
      .getFileFromTempDir(fileUUID)
      .catch(error => {
        adminLogger.error(
          formatErrorMessage({
            requestId: req.requestId,
            error
          })
        );
      });

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
      createdBy: SessionHandler.getUserId(req),
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
      adminLogger.error(
        formatErrorMessage({
          error,
          requestId: req.requestId
        })
      );
      return res.status(400).json({
        errorCode: ErrorCode.ErrorFileNotFound,
        message: getResponseMessage(ErrorCode.ErrorFileNotFound)
      });
    }

    // remove file from tmp
    await FileUtil.deleteFileFromTempDir(fileUUID);

    res.status(201).json(null);
  } catch (error) {
    next(error);
  }
});

router.get('/brands', async(req, res, next) => {
  try {
    res.render('admin/pages/brand/list.html', {
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

router.get('/brand/list', async(req, res, next) => {
  try {
    const { limit, offset, draw } = req.paginationParams;
    const { docs, totalPages, totalDocs } = await BrandRepository.getPagination({}, limit, offset);
    res.status(200).json({
      data: {
        pagination: {
          draw,
          limit,
          offset,
          pages: totalPages,
          docLength: totalDocs
        },
        list: docs
      }
    });
  } catch (error) {
    next(error);
  }
});

router.get('/brand/check-name', async(req, res, next) => {
  try {
    if (!req.query.brandName || !req.query.brandName.trim()) return res.status(200).json({ data: { isExists: false } });
    const brand = await BrandRepository.getBrandByBrandName(req.query.brandName.trim());
    res.status(200).json({
      data: {
        isExists: Boolean(brand)
      }
    }); 
  } catch (error) {
    next(error);
  }
});

module.exports = router;