const router = require('express').Router();
const { SideBarMenu } = require('../../const').Admin;
const { ErrorCode, getResponseMessage } = require('../../const').Api;
const { RoleRepository, UserRepository } = require('../../repos');
const { Validator, Auth, SessionHandler } = require('../../libs');

router.get('/user/add', async(req, res, next) => {
  try {
    const roles = await RoleRepository.getAll();

    res.render('admin/pages/user/create-user.html', {
      $page: {
        sidebar: {
          active: SideBarMenu.USER
        },
        data: {
          roles: roles.map(role => ({ value: role._id, label: role.roleName }))
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

router.post('/user/add', async(req, res, next) => {
  try {
    if (!Validator.validateUserCreation(req.body)) {
      return res.status(400).json(
        {
          errorCode: ErrorCode.ValidationFailed,
          message: getResponseMessage(ErrorCode.ValidationFailed),
          data: {
            errors: Validator.validateUserCreation.errors
          }
        }
      );
    }
    const { username, firstname, lastname, password, role } = req.body;
    const defaultPassword = password || '123456';
    // check if user name is already taken
    if (await UserRepository.getUserByUsername(username.trim())) {
      return res.status(400).json(
        {
          errorCode: ErrorCode.ErrorUserNameTaken,
          message: getResponseMessage(ErrorCode.ErrorUserNameTaken)
        }
      );
    }

    const [derivedPass, salt] = await Auth.hashPassword(defaultPassword);

    // insert to db
    await UserRepository.createUser(
      {
        firstname,
        lastname,
        username,
        role,
        password: derivedPass,
        salt,
        createdBy: SessionHandler.getUserId(req)
      }
    );

    res.status(201).json(null);
  } catch (error) {
    next(error);
  }
});

router.get('/user/check-username', async(req, res, next) => {
  try {
    const username = req.query.username;
    if (!username) return res.status(200).json({ data: { isUserExists: false } });
    if (!await UserRepository.getUserByUsername(username.trim())) return res.status(200).json({ data: { isUserExists: false } });
    res.status(200).json({ data: { isUserExists: true } });
  } catch (error) {
    next(error);
  }
});

router.get('/users', async(req, res, next) => {
  try {
    res.render('admin/pages/user/list.html', {
      $page: {
        sidebar: {
          active: SideBarMenu.USER
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

router.get('/user/list', async(req, res, next) => {
  try {
    const { limit, offset, draw } = req.paginationParams;
    const { totalPages, totalDocs, docs } = await UserRepository.getPagination(limit, offset);
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

module.exports = router;