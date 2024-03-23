const router = require('express').Router();
const { cacheHTML } = require('../../../middleware');

router.get('/', cacheHTML, async(req, res, next) => {
  try {
    res.render('admin/pages/home/home.html');
  } catch (error) {
    next(error);
  }
});

module.exports = router;