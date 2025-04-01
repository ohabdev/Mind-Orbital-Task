const authController = require('./auth.controller');
const localController = require('./local');

module.exports = (router) => {
  router.post(
    '/v1/auth/login',
    localController.login,
    Middleware.Response.success('login')
  );

  router.post(
    '/v1/auth/register',
    authController.register,
    Middleware.Response.success('register')
  );

  router.post(
    '/v1/auth/forgot',
    authController.forgot,
    Middleware.Response.success('forgot')
  );

  router.use(
    '/v1/auth/passwordReset/:token',
    authController.resetPasswordView
  );
};
