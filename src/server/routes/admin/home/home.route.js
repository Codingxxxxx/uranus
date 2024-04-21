const router = require('express').Router();
const { cacheHTML } = require('../../../middleware');
const { SideBarMenu } = require('../../../const').Admin;

router.get('/', cacheHTML, async(req, res, next) => {
  try {
    res.render('admin/pages/home/home.html', {
      $page: {
        sidebar: {
          active: SideBarMenu.DASHBOARD
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;