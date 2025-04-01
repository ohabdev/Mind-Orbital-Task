const configController = require('../controllers/config.controller');

module.exports = (router) => {
  
  router.get(
    '/v1/system/configs',
    Middleware.hasRole('admin'),
    configController.list,
    Middleware.Response.success('configs')
  );


  router.put(
    '/v1/system/configs/:id',
    Middleware.hasRole('admin'),
    configController.findOne,
    configController.update,
    Middleware.Response.success('update')
  );

  router.get(
    '/v1/system/configs/public',
    configController.publicConfig,
    Middleware.Response.success('publicConfig')
  );
};
