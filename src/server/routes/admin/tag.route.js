const router = require('express').Router();
const { Admin, Api } = require('../../const');
const { Validator, SessionHandler, Slug } = require('../../libs');
const { TagRepository } = require('../../repos');
const { SideBarMenu } = Admin;
const { ErrorCode, getResponseMessage } = Api;

router.get('/tag/add', async(req, res, next) => {
  try {
    res.render('admin/pages/tag/create.html', {
      $page: {
        sidebar: {
          active: SideBarMenu.TAG
        }
      }
    });
  } catch (error) {
    next(error);
  }  
});

router.post('/tag/add', async(req, res, next) => {
  try {
    if (!Validator.validateTagCreation(req.body)) {
      return res.status(400).json({
        errorCode: ErrorCode.ValidationFailed,
        message: getResponseMessage(ErrorCode.ValidationFailed)
      });
    }
    const { tagName } = req.body;
    // check if tag name exist
    if (await TagRepository.getTagByName(tagName.trim())) {
      return res.status(400).json({
        errorCode: ErrorCode.ErrorTagNameTaken,
        message: getResponseMessage(ErrorCode.ErrorTagNameTaken)
      });
    }

    await TagRepository.create([
      { 
        tagName: tagName.trim(),
        slug: Slug.slugify(tagName.trim()),
        createdBy: SessionHandler.getUserId(req) 
      }
    ]);

    res.status(201).json(null);
  } catch (error) {
    next(error); 
  }
});

router.get('/tag/check-name', async(req, res, next) => {
  try {
    if (!req.query.tagName || !req.query.tagName.trim()) {
      return res.status(200).json({ data: { isExists: false } });
    }

    if (!await TagRepository.getTagByName(req.query.tagName)) return res.status(200).json({ data: { isExists: false } });
    res.status(200).json({
      data: {
        isExists: true
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;