const router = require('express').Router();
const { Auth, Validator } = require('../../libs');
const { getResponseMessage, ErrorCode } = require('../../const').Api;
const { UserStatus } = require('../../const').Mongo;
const { UserRepository } = require('../../repos');

router.get('/login', async(req, res, next) => {
  try {
    res.render('admin/pages/auth/login.html');
  } catch (error) {
    next(error);
  }
});

router.post('/login', async(req, res, next) => {
  try {
    if (!Validator.validateUserLogin(req.body)) {
      return res.status(400).json({
        errorCode: ErrorCode.ValidationFailed,
        message: getResponseMessage(ErrorCode.ValidationFailed),
        data: {
          errors: Validator.validateUserLogin.errors
        }
      });
    }

    const { username, password } = req.body;

    // check if username & password valid
    const user = await UserRepository.getUserByUsername(username.trim());

    if (!user) {
      return res.status(400).json({
        errorCode: ErrorCode.ErrorInvalidUsernamePassword,
        message: getResponseMessage(ErrorCode.ErrorInvalidUsernamePassword)
      });
    }

    // validate password
    const [derivedPass] = await Auth.hashPassword(password, user.salt);

    // compare password with current one
    if (derivedPass !== user.password) {
      return res.status(400).json({
        errorCode: ErrorCode.ErrorInvalidUsernamePassword,
        message: getResponseMessage(ErrorCode.ErrorInvalidUsernamePassword)
      });
    }

    // check if user is banned
    if (user.status === UserStatus.Banned) {
      return res.status(400).json({
        errorCode: ErrorCode.ErrorUserBanned,
        message: getResponseMessage(ErrorCode.ErrorUserBanned)
      });
    }

    // create session
    req.session.userData = {
      _id: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role
    };

    res.status(200).json({
      data: {
        redirectUrl: '/admin'
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;