const multer = require('multer');

const uploadAvatar = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'public/avatar/');
    },
    filename(req, file, cb) {
      const fileName = Helper.String.randomString(5) + Helper.String.getExt(file.originalname);
      cb(null, fileName);
    }
  })
});

const userController = require('../controllers/user.controller');

module.exports = (router) => {
  router.post(
    '/v1/users',
    Middleware.hasRole('admin'),
    userController.create,
    Middleware.Response.success('user')
  );

  router.post(
    '/v1/users/:id/avatar',
    Middleware.hasRole('admin'),
    uploadAvatar.single('avatar'),
    userController.updateAvatar,
    Middleware.Response.success('updateAvatar')
  );

  router.post(
    '/v1/users/avatar',
    Middleware.isAuthenticated,
    uploadAvatar.single('avatar'),
    userController.updateAvatar,
    Middleware.Response.success('updateAvatar')
  );

  router.put(
    '/v1/users',
    Middleware.isAuthenticated,
    userController.update,
    Middleware.Response.success('update')
  );

  router.put(
    '/v1/users/:id',
    Middleware.hasRole('admin'),
    userController.update,
    Middleware.Response.success('update')
  );

  router.get(
    '/v1/users/me',
    Middleware.isAuthenticated,
    userController.me,
    Middleware.Response.success('me')
  );

  router.get(
    '/v1/users/search',
    Middleware.hasRole('admin'),
    userController.search,
    Middleware.Response.success('search')
  );

  router.get(
    '/v1/users/:id',
    Middleware.isAuthenticated,
    userController.findOne,
    Middleware.Response.success('user')
  );

  router.delete(
    '/v1/users/:userId',
    Middleware.hasRole('admin'),
    userController.remove,
    Middleware.Response.success('remove')
  );
};
