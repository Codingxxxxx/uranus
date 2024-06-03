const router = require('express').Router();
const { Admin, Api } = require('../../const');
const { Validator, SessionHandler, Slug } = require('../../libs');
const { CategoryRepository } = require('../../repos');
const { SideBarMenu } = Admin;
const { ErrorCode, getResponseMessage } = Api;

router.get('/category/add', async(req, res, next) => {
  try {
    res.render('admin/pages/category/create.html', {
      $page: {
        sidebar: {
          active: SideBarMenu.CATEGORY
        }
      }
    });
  } catch (error) {
    next(error);
  }  
});

router.post('/category/add', async(req, res, next) => {
  try {
    if (!Validator.validateCategoryCreation(req.body)) {
      return res.status(400).json({
        errorCode: ErrorCode.ValidationFailed,
        message: getResponseMessage(ErrorCode.ValidationFailed)
      });
    }
    const { categoryName } = req.body;
    // check if tag name exist
    if (await CategoryRepository.getCategoryByName(categoryName.trim())) {
      return res.status(400).json({
        errorCode: ErrorCode.ErrorCategoryNameTaken,
        message: getResponseMessage(ErrorCode.ErrorCategoryNameTaken)
      });
    }

    await CategoryRepository.create([
      { 
        categoryName: categoryName.trim(),
        slug: Slug.slugify(categoryName.trim()),
        createdBy: SessionHandler.getUserId(req) 
      }
    ]);

    res.status(201).json(null);
  } catch (error) {
    next(error); 
  }
});

router.get('/category/check-name', async(req, res, next) => {
  try {
    if (!req.query.categoryName || !req.query.categoryName.trim()) {
      return res.status(200).json({ data: { isExists: false } });
    }

    if (!await CategoryRepository.getCategoryByName(req.query.categoryName)) return res.status(200).json({ data: { isExists: false } });
    res.status(200).json({
      data: {
        isExists: true
      }
    });
  } catch (error) {
    next(error);
  }
});

router.get('/categories', async(req, res, next) => {
  try {
    res.render('admin/pages/category/list.html', {
      $page: {
        sidebar: {
          active: SideBarMenu.CATEGORY
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

router.get('/category/list', async(req, res, next) => {
  try {
    const { limit, offset, draw } = req.paginationParams;
    const { totalPages, totalDocs, docs } = await CategoryRepository.getPagination(limit, offset);
    res.status(200).json({
      data: {
        pagination: {
          limit,
          offset,
          draw,
          page: totalPages,
          docLength: totalDocs
        },
        list: docs
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;