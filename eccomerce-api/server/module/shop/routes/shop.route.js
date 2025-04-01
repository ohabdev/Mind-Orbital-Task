const shopController = require('../controllers/shop.controller');

module.exports = (router) => {
  router.get(
    '/v1/shops/me',
    Middleware.isAuthenticated,
    shopController.getUserShop,
    Middleware.Response.success('shop')
  );

  router.get(
    '/v1/shops/search',
    Middleware.loadUser,
    shopController.search,
    Middleware.Response.success('search')
  );

  router.get(
    '/v1/shops/:shopId',
    Middleware.loadUser,
    shopController.details,
    Middleware.Response.success('shop')
  );

  router.post(
    '/v1/shops',
    Middleware.hasRole('admin'),
    shopController.create,
    Middleware.Response.success('create')
  );

  router.put(
    '/v1/shops/:shopId',
    Middleware.isAuthenticated,
    shopController.update,
    Middleware.Response.success('update')
  );
};
